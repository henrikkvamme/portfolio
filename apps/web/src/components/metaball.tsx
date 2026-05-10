'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Vector2 } from 'three';

const TRAIL_LENGTH = 15;
// How often the trail records the leader's position (seconds). Trail span =
// TRAIL_LENGTH × interval ≈ 0.45s of motion history.
const TRAIL_SHIFT_INTERVAL_S = 0.03;
// Underdamped spring: ω₀ = √stiffness, ζ = damping / (2 ω₀).
// ζ < 1 → leader overshoots the cursor and oscillates before settling.
const SPRING_STIFFNESS = 80;
const SPRING_DAMPING = 7;
// Hard cap on |leader − target|. Below this, the spring runs unconstrained so
// small motions feel smooth and the bounce-and-settle is fully visible. Above
// it (sudden cursor jumps, first move from rest), the leader is projected back
// onto the bubble edge — instant snap so it never feels laggy.
const MAX_LAG_DISTANCE = 0.4;
// Clamp dt so explicit Euler stays stable on a frame hitch (~30 fps floor).
const MIN_FPS_FOR_INTEGRATION = 30;
const MAX_DT_S = 1 / MIN_FPS_FOR_INTEGRATION;

/**
 * Coordinate system used by both the shader and the JS pointer handler:
 *
 *   p = (fragCoord * 2 - resolution) / min(resolution.x, resolution.y)
 *
 * - origin (0, 0) is the centre of the viewport
 * - x ranges from -aspectRatio to +aspectRatio (left → right)
 * - y ranges from -1 to +1 (bottom → top, gl_FragCoord convention)
 *
 * `viewportToShader` is the JS-side inverse for cursor coords. The shader's
 * `normalizedToShader` is the same mapping but takes 0-1 inputs (so 0.5 = centre).
 */
const viewportToShader = (
  clientX: number,
  clientY: number,
  viewport: Vector2,
  out: Vector2
) => {
  const min = Math.min(viewport.x, viewport.y);
  // clientY origin is top-left; gl_FragCoord origin is bottom-left → flip.
  out.set((clientX * 2 - viewport.x) / min, (viewport.y - clientY * 2) / min);
};

const vertexShader = `
attribute vec3 position;
varying vec2 vTexCoord;

void main() {
    vTexCoord = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

const int TRAIL_LENGTH = 15;
const float EPS = 1e-4;
const int ITR = 16;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uPointerTrail[TRAIL_LENGTH];

// Map normalized 0-1 coords to the same shader space the cursor and gl_FragCoord use.
// (0.5, 0.5) → centre of viewport.
vec3 normalizedToShader(float x, float y, float z) {
    float aspectRatio = uResolution.x / uResolution.y;
    return vec3((x * 2.0 - 1.0) * aspectRatio, y * 2.0 - 1.0, z);
}

float rnd3D(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453123);
}

float noise3D(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);

    float a000 = rnd3D(i);
    float a100 = rnd3D(i + vec3(1.0, 0.0, 0.0));
    float a010 = rnd3D(i + vec3(0.0, 1.0, 0.0));
    float a110 = rnd3D(i + vec3(1.0, 1.0, 0.0));
    float a001 = rnd3D(i + vec3(0.0, 0.0, 1.0));
    float a101 = rnd3D(i + vec3(1.0, 0.0, 1.0));
    float a011 = rnd3D(i + vec3(0.0, 1.0, 1.0));
    float a111 = rnd3D(i + vec3(1.0, 1.0, 1.0));

    vec3 u = f * f * (3.0 - 2.0 * f);

    float k0 = a000;
    float k1 = a100 - a000;
    float k2 = a010 - a000;
    float k3 = a001 - a000;
    float k4 = a000 - a100 - a010 + a110;
    float k5 = a000 - a010 - a001 + a011;
    float k6 = a000 - a100 - a001 + a101;
    float k7 = -a000 + a100 + a010 - a110 + a001 - a101 - a011 + a111;

    return k0 + k1 * u.x + k2 * u.y + k3 * u.z + k4 * u.x * u.y + k5 * u.y * u.z + k6 * u.z * u.x + k7 * u.x * u.y * u.z;
}

const vec3 origin = vec3(0.0, 0.0, 1.0);
const vec3 cDir = vec3(0.0, 0.0, -1.0);
const vec3 cUp = vec3(0.0, 1.0, 0.0);
const vec3 cSide = vec3(1.0, 0.0, 0.0);

// Exponential smooth-min — wider K → sharper blend. Visually matches
// the "fluid metaball" look better than the polynomial variant.
float smoothMin(float a, float b, float k) {
    float h = exp(-k * a) + exp(-k * b);
    return -log(h) / k;
}

float sdSphere(vec3 p, float s) {
    return length(p) - s;
}

// Global radius multiplier for the floating background spheres.
const float SIZE = 0.35;
// Cursor blob shrinks independently — keep the trail tighter than the bg spheres.
const float TRAIL_SIZE = 0.18;

float map(vec3 p) {
    float baseRadius = 4.5e-2 * TRAIL_SIZE;
    float radius = baseRadius * float(TRAIL_LENGTH);
    float k = 7.0;
    float d = 1e5;

    for (int i = 0; i < TRAIL_LENGTH; i++) {
        float fi = float(i);
        vec2 trail = uPointerTrail[i];
        float sphere = sdSphere(p - vec3(trail, 0.0), radius - baseRadius * fi);
        d = smoothMin(d, sphere, k);
    }

    vec3 fp1 = normalizedToShader(0.85 + sin(uTime * 0.3) * 0.1, 0.8 + cos(uTime * 0.2) * 0.1, sin(uTime * 0.1) * 0.2);
    d = smoothMin(d, sdSphere(p - fp1, (0.3 + 0.05 * sin(uTime * 0.7)) * SIZE), k);

    vec3 fp2 = normalizedToShader(0.15 + cos(uTime * 0.4) * 0.08, 0.3 + sin(uTime * 0.35) * 0.15, cos(uTime * 0.15) * 0.2);
    d = smoothMin(d, sdSphere(p - fp2, (0.25 + 0.06 * cos(uTime * 0.5)) * SIZE), k);

    vec3 fp3 = normalizedToShader(0.4 + sin(uTime * 0.25) * 0.15, 0.9 + cos(uTime * 0.4) * 0.08, sin(uTime * 0.2) * 0.15);
    d = smoothMin(d, sdSphere(p - fp3, (0.35 + 0.05 * sin(uTime * 0.9)) * SIZE), k);

    vec3 fp4 = normalizedToShader(0.75 + cos(uTime * 0.5) * 0.12, 0.2 + sin(uTime * 0.3) * 0.1, cos(uTime * 0.12) * 0.25);
    d = smoothMin(d, sdSphere(p - fp4, (0.28 + 0.06 * cos(uTime * 0.6)) * SIZE), k);

    vec3 fp5 = normalizedToShader(0.5 + sin(uTime * 0.8) * 0.2, 0.5 + cos(uTime * 0.6) * 0.2, sin(uTime * 0.4) * 0.2);
    d = smoothMin(d, sdSphere(p - fp5, (0.38 + 0.04 * sin(uTime * 1.1)) * SIZE), k);

    vec3 fp6 = normalizedToShader(0.25 + cos(uTime * 0.35) * 0.1, 0.15 + sin(uTime * 0.45) * 0.1, cos(uTime * 0.18) * 0.2);
    d = smoothMin(d, sdSphere(p - fp6, (0.27 + 0.06 * cos(uTime * 0.8)) * SIZE), k);

    return d;
}

// Tetrahedral 4-tap normal (33% fewer map() calls than 6-tap central differences).
vec3 generateNormal(vec3 p) {
    const vec2 e = vec2(1.0, -1.0);
    return normalize(
        e.xyy * map(p + e.xyy * EPS) +
        e.yyx * map(p + e.yyx * EPS) +
        e.yxy * map(p + e.yxy * EPS) +
        e.xxx * map(p + e.xxx * EPS)
    );
}

vec3 dropletColor(vec3 normal, vec3 rayDir) {
    vec3 reflectDir = reflect(rayDir, normal);
    float n0 = noise3D(reflectDir * 2.0 + uTime);
    float n1 = noise3D(reflectDir * 2.0 - uTime);
    vec3 c0 = vec3(0.1765, 0.1255, 0.2275) * n0;
    vec3 c1 = vec3(0.4118, 0.4118, 0.4157) * n1;
    return (c0 + c1) * 2.3;
}

void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);

    vec3 ray = origin + cSide * p.x + cUp * p.y;
    vec3 rayDirection = cDir;

    float dist = 0.0;
    for (int i = 0; i < ITR; ++i) {
        dist = map(ray);
        ray += rayDirection * dist;
        if (dist < EPS) break;
    }

    vec3 color = vec3(0.0);
    vec3 normal = vec3(0.0);
    bool hit = dist < EPS;
    if (hit) {
        normal = generateNormal(ray);
        color = dropletColor(normal, rayDirection);
    }

    // pow(color, 7.0) expanded as 4 multiplies.
    vec3 c2 = color * color;
    vec3 c4 = c2 * c2;
    vec3 finalColor = c4 * c2 * color;

    // Fresnel rim light — only on the actual surface, so the highlight tracks
    // the 3D silhouette of each ball instead of a screen-space halo.
    if (hit) {
        float fresnel = 1.0 - max(dot(normal, -rayDirection), 0.0);
        float rim = pow(fresnel, 2.5);
        finalColor += vec3(0.65, 0.6, 0.85) * rim * 0.55;
    }

    gl_FragColor = vec4(finalColor, 1.0);
}
`;

export default function Metaball() {
  const { gl } = useThree();

  // Pre-allocated. `useMemo` guarantees the initializer runs once.
  const trail = useMemo<Vector2[]>(
    () => Array.from({ length: TRAIL_LENGTH }, () => new Vector2()),
    []
  );
  const viewport = useMemo(() => new Vector2(), []);
  // Spring state — leader chases target, trail samples leader over time.
  const target = useMemo(() => new Vector2(), []);
  const leader = useMemo(() => new Vector2(), []);
  const velocity = useMemo(() => new Vector2(), []);
  const trailAccumRef = useRef(0);

  // uResolution must match the shader's `gl_FragCoord` scale, which is the
  // drawing-buffer size — NOT the canvas's CSS size. With dpr > 1 they differ.
  const [uniforms] = useState(() => ({
    uResolution: {
      value: new Vector2(gl.domElement.width, gl.domElement.height),
    },
    uTime: { value: 0 },
    uPointerTrail: { value: trail },
  }));

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      if (viewport.x === 0 || viewport.y === 0) {
        return;
      }
      // Pointer events only update the spring's target. The leader and trail
      // advance in useFrame, so the trail keeps moving (and the leader keeps
      // bouncing back to the cursor) even when the cursor is still.
      viewportToShader(event.clientX, event.clientY, viewport, target);
    },
    [viewport, target]
  );

  useEffect(() => {
    const updateViewport = () =>
      viewport.set(window.innerWidth, window.innerHeight);
    updateViewport();

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('resize', updateViewport);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', updateViewport);
    };
  }, [handlePointerMove, viewport]);

  useFrame((_state, delta) => {
    const dt = Math.min(delta, MAX_DT_S);

    // Underdamped spring: a = -k(x - target) - c·v. Semi-implicit Euler.
    const fx =
      SPRING_STIFFNESS * (target.x - leader.x) - SPRING_DAMPING * velocity.x;
    const fy =
      SPRING_STIFFNESS * (target.y - leader.y) - SPRING_DAMPING * velocity.y;
    velocity.x += fx * dt;
    velocity.y += fy * dt;
    leader.x += velocity.x * dt;
    leader.y += velocity.y * dt;

    // Snap clamp — never let the leader fall further than MAX_LAG_DISTANCE
    // behind. Big jumps get an instant pull; small motions are untouched.
    const dx = target.x - leader.x;
    const dy = target.y - leader.y;
    const distSq = dx * dx + dy * dy;
    if (distSq > MAX_LAG_DISTANCE * MAX_LAG_DISTANCE) {
      const dist = Math.sqrt(distSq);
      const drag = (dist - MAX_LAG_DISTANCE) / dist;
      leader.x += dx * drag;
      leader.y += dy * drag;
    }

    // Time-driven trail sampling — runs even when the cursor is still, so the
    // tail visibly follows the leader's bounce-and-settle motion.
    trailAccumRef.current += dt;
    while (trailAccumRef.current >= TRAIL_SHIFT_INTERVAL_S) {
      trailAccumRef.current -= TRAIL_SHIFT_INTERVAL_S;
      for (let i = TRAIL_LENGTH - 1; i > 0; i--) {
        trail[i].copy(trail[i - 1]);
      }
      trail[0].copy(leader);
    }

    uniforms.uTime.value += dt;

    const dbW = gl.domElement.width;
    const dbH = gl.domElement.height;
    if (
      uniforms.uResolution.value.x !== dbW ||
      uniforms.uResolution.value.y !== dbH
    ) {
      uniforms.uResolution.value.set(dbW, dbH);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <rawShaderMaterial
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        vertexShader={vertexShader}
      />
    </mesh>
  );
}
