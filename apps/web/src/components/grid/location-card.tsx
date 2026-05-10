import { useEffect, useRef } from 'react';
import type { MapRef } from 'react-map-gl/mapbox';
import { Map as MapboxMap, Marker } from 'react-map-gl/mapbox';
import { TiltCard } from '@/components/tilt-card';
import 'mapbox-gl/dist/mapbox-gl.css';

type LocationCardProps = {
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
};

export function LocationCard({ colSpan = 1, rowSpan = 2 }: LocationCardProps) {
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        // Force map to resize
        mapRef.current.getMap().resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <TiltCard
      className="flex h-full flex-col overflow-hidden p-0"
      colSpan={colSpan}
      hoverBrightness={true}
      rowSpan={rowSpan}
      tiltIntensity="none"
    >
      <div className="relative h-full w-full">
        <MapboxMap
          attributionControl={false}
          doubleClickZoom={true}
          dragPan={true}
          dragRotate={true}
          initialViewState={{
            longitude: 10.4018,
            latitude: 63.4178,
            zoom: 14,
          }}
          interactive={true}
          keyboard={true}
          mapboxAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v11"
          ref={mapRef}
          scrollZoom={true}
          style={{ width: '100%', height: '100%' }}
          touchZoomRotate={true}
          transformRequest={(url, _resourceType) => {
            // Block telemetry requests to prevent console errors
            if (url.includes('events.mapbox.com')) {
              return { url: '' };
            }
            return { url };
          }}
        >
          <Marker anchor="center" latitude={63.4178} longitude={10.4018}>
            <div className="h-3 w-3 animate-pulse rounded-full bg-white shadow-lg" />
          </Marker>
        </MapboxMap>

        <div className="absolute right-6 bottom-6 text-right">
          <p className="mb-1 font-medium text-white/50 text-xs uppercase tracking-wide">
            Location
          </p>
          <h2 className="mb-0.5 font-bold text-white text-xl">
            Gløshaugen NTNU
          </h2>
          <p className="text-sm text-white/70">Trondheim, Norway</p>
        </div>
      </div>
    </TiltCard>
  );
}
