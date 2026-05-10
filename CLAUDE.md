<!-- vibe-rules Integration -->

<enforce-bun>

Always use Bun as the package manager for this project.

- Use 'bun install' instead of npm/yarn/pnpm install
- Use 'bun add' instead of npm/yarn/pnpm add
- Use 'bun run' instead of npm/yarn/pnpm run
- If you see npm/yarn/pnpm commands being used, suggest Bun alternatives
- Check for bun.lockb file presence to ensure Bun is being used correctly

</enforce-bun>

<use-oxc>

## Oxlint + Oxfmt (Rust-based linter + formatter)

### After Editing Files

- **Run**: `bun run lint:fix` to auto-fix lint issues
- **Run**: `bun run format:fix` to apply formatting
- Or both at once: `bun run lint:fix && bun run format:fix`

### Verify Before Committing

- **Run**: `bun run check` — runs `oxlint` + `oxfmt --check` (must be clean)

### Config

- Lint rules: `.oxlintrc.json`
- Format rules: `.oxfmtrc.json`

Don't use eslint, prettier, or biome — oxc handles linting and formatting.

</use-oxc>

<frontend>

## Frontend Development - Tailwind + shadcn

### Component Installation

- **With pnpm**: \`pnpm dlx shadcn@latest add button\`
- **With bun**: \`bunx --bun shadcn@latest add button\`
- Replace 'button' with the component name you need

### Design Standards

- **Consistent design** - maintain visual consistency across all components
- **Follow design fundamentals** - proper spacing, typography, color harmony
- **Edit component source** - modify shadcn components in \`/components/ui/\` directly, don't override styles elsewhere
- **Layout-level responsiveness** - configure responsive behavior at layout/container level, not individual components

### Tailwind Configuration

- **Edit \`tailwind.config.js\`** - customize colors to match app design
- **Reflect actual theme** - if app is light mode only, configure accordingly
- **Define theme colors** - add custom colors to config instead of using defaults
- **Semantic naming** - use \`primary\`, \`secondary\`, \`accent\` vs generic colors

### Styling Standards

- **Use Tailwind classes** - no custom CSS unless absolutely necessary
- **Use shadcn components** - don't reinvent common UI elements
- **Modify at source** - edit the actual component file, not the consuming component
- **Responsive at layout** - handle breakpoints in layout components for consistency

### Quick Workflow

1. Need a component? Check if shadcn has it
2. Install with appropriate package manager command
3. Update \`tailwind.config.js\` for app-specific colors/theme
4. Edit component source in \`/components/ui/\` if customization needed
5. Handle responsive design at layout level
6. Ensure design consistency across the app

</frontend>

<typescript-standards>

## TypeScript Standards

### MANDATORY Before Continuing

- Run \`tsc --noEmit\` or \`npm run type-check\` - fix ALL type errors
- Ensure \`npm run build\` passes successfully
- **NEVER use \`any\`** - use \`unknown\`, union types, or proper interfaces instead

### Key Practices

- Add explicit return types to functions
- Use \`interface\` for objects, \`type\` for unions
- Handle null/undefined with optional chaining (\`obj?.prop\`)
- Create type guards for runtime checks
- Use utility types: \`Partial<T>\`, \`Pick<T, K>\`, \`Omit<T, K>\`

### Quick Checklist

1. ✅ Zero TypeScript errors
2. ✅ Build passes
3. ✅ No \`any\` types
4. ✅ Functions have return types

Don't use \`@ts-ignore\` or \`as\` casting without strong justification.

</typescript-standards>

<!-- /vibe-rules Integration -->
