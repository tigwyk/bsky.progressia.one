# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**ProgressiaOne** is a community-driven fork of the official Bluesky Social client built in React Native (TypeScript). It's the primary client for the ProgressiaOne community, tracking upstream releases while adding community-specific features and policies focused on decentralized social networking.

## Common Development Commands

### Dependencies & Setup
```bash
# Install dependencies
yarn
# Or with additional embed dependencies
make deps
```

### Development Servers
```bash
# Web development server
yarn web
# iOS simulator
yarn ios
# Android emulator  
yarn android
# Development with client mode
yarn start
```

### Building
```bash
# Web production build
yarn build-web
# Or using make/just
make build-web
just dist-build-web

# Native builds (requires EAS setup)
yarn build-ios
yarn build-android
yarn build-all
```

### Testing & Quality
```bash
# Run unit tests
yarn test
# Watch mode for tests
yarn test-watch
# Test with coverage
yarn test-coverage
# Type checking
yarn typecheck
# Linting
yarn lint
# Native code linting
yarn lint-native
```

### E2E Testing
```bash
# Start mock server (in separate terminal)
yarn e2e:mock-server
# Start metro with E2E config (in separate terminal)
yarn e2e:metro
# Build E2E tests (run once)
yarn e2e:build
# Run E2E tests
yarn e2e:run
```

### Internationalization
```bash
# Extract and compile translations
yarn intl:build
# Compile only
yarn intl:compile
```

### Single Test Files
To run a single test file, use the standard Jest pattern:
```bash
yarn test --testNamePattern="specific test name"
yarn test path/to/specific.test.ts
```

## Code Architecture

### High-Level Structure

The codebase follows a React Native application structure with cross-platform support (iOS, Android, Web):

- **`src/`** - Main application code with `#/*` alias mapping to `src/*`
- **`src/alf/`** - Application Layout Framework (ALF) - UI primitives and design system 
- **`src/components/`** - Reusable React components organized by feature
- **`src/screens/`** - Screen-level components for navigation routes
- **`src/state/`** - State management using TanStack Query and local state
- **`src/lib/`** - Utility libraries and shared business logic
- **`src/view/`** - Legacy view components (being migrated to new structure)

### Key Architectural Patterns

#### Design System (ALF)
The Application Layout Framework uses Tailwind-inspired naming with `_` delimiters:
- Spacing uses t-shirt sizes (`xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`)
- Theme-aware styles accessed via `useTheme()` hook
- Responsive breakpoints via `useBreakpoints()` hook

#### State Management
- **TanStack Query** for server state and caching
- **Local state** for UI state management
- **Persisted state** in `src/state/persisted/` for user preferences
- **Session management** in `src/state/session/`

#### Platform Abstraction
- Platform-specific files use extensions: `.ios.ts`, `.android.ts`, `.web.ts`, `.native.ts`
- Web version should be the default (no platform specifier)
- Polyfills in `src/platform/polyfills.*.ts`

#### Component Organization
Components are organized by domain rather than type:
- `src/components/Post/` - Post-related components
- `src/components/dms/` - Direct messaging components  
- `src/components/dialogs/` - Dialog/modal components
- `src/screens/Settings/` - Settings screen and subcomponents

### AT Protocol Integration

The app is built on the **AT Protocol** (Authenticated Transfer Protocol):
- Uses `@atproto/api` for core protocol interactions
- Handles decentralized identity, content, and moderation
- Custom ProgressiaOne defaults: uses `progressia1.app` PDS and `*.progressia1.app` handles

### Build & Deployment

#### Multi-Platform Builds
- **Web**: Static export deployed via Cloudflare Pages
- **iOS/Android**: Uses Expo Application Services (EAS) for native builds
- **React Native Web**: Serves web version through web-build output

#### Environment Configuration
- Copy `.env.example` to `.env` for local development
- `EXPO_PUBLIC_ENV` determines build environment (development/testflight/production)
- Native builds require `google-services.json` (example provided)

### Key Dependencies

- **React Native 0.79+** with React 19
- **Expo SDK 53** for cross-platform APIs
- **TypeScript 5.8+** for type safety
- **TanStack Query** for data fetching and caching
- **React Navigation 7** for navigation
- **Expo Video** for video playback
- **Reanimated 3** for animations

### Testing Strategy

- **Unit tests** with Jest and React Native Testing Library
- **E2E tests** using Maestro for cross-platform flows
- **Performance tests** with Flashlight for native performance monitoring
- **Mock server** for isolated testing environment

## Development Notes

### Hot Reload Workflow
After initial `yarn ios`/`yarn android`, you can use `yarn web` and press `i` or `a` to quickly launch simulators.

### Native Changes
When making changes to native code or dependencies:
1. Run `yarn prebuild` to regenerate native directories
2. Rebuild with `yarn ios`/`yarn android`

### Debugging
- Use React Native Flipper or Chrome DevTools for debugging
- Expo Developer Menu: Shake device or `Cmd+D` (iOS simulator)
- Enable Remote JS Debugging through the developer menu

### Code Quality
- Prettier for formatting (no semicolons, single quotes, trailing commas)
- ESLint with custom rules and import sorting
- TypeScript strict mode enabled
- Husky pre-commit hooks for quality checks

### Linting & Pre-commit Setup

The project uses a multi-package ESLint configuration:
- **Main project**: Standard React Native ESLint config
- **bskyembed subproject**: Uses `eslint-config-preact` for Preact compatibility

#### Fixing ESLint Issues
If you encounter ESLint config errors:
```bash
# Check main project linting
yarn lint

# For bskyembed subproject specifically
cd bskyembed && yarn lint

# Auto-fix common issues
yarn lint --fix
```

#### Pre-commit Hook Troubleshooting
Pre-commit hooks run automatically on `git commit`. If they fail:
1. Fix linting errors shown in the output
2. Common fixes: unused imports, variable shadowing, missing break statements
3. Stage your fixes and commit again

```bash
# Manual pre-commit check
yarn run lint-staged
```

## Branding & Design Assets

### Logo Components
ProgressiaOne uses custom P1 branding with three main logo components:

- **`src/view/icons/Logo.tsx`** - Full logo with theme integration
- **`src/view/icons/Logomark.tsx`** - Square P1 icon with accent dot
- **`src/view/icons/Logotype.tsx`** - Text-only "P1" logo

#### Logo Features:
- **Magenta/purple gradient** matching ProgressiaOne brand colors
- **Blue accent dot** for brand recognition
- **Theme-aware styling** (adapts to light/dark modes)
- **Consistent sizing** with original Bluesky component interfaces
- **SVG-based** for crisp rendering at all scales

#### Usage Examples:
```tsx
import {Logo, Logomark, Logotype} from '#/view/icons'

// Full logo (recommended for headers)
<Logo width={120} />

// Square icon (for favicons, app icons)
<Logomark width={32} />

// Text logo (for minimal contexts)
<Logotype width={80} />
```

### Brand Colors
Defined in `src/alf/themes.ts`:
```typescript
export const BRAND = {
  primaryLight: '#FF006E',    // Magenta
  primaryDark: '#FF3D8B',     // Pink tint
  secondary: '#8B5CF6',       // Purple
  accent: '#01AAEE',          // Blue (used in logo dot)
}
```

## Recent Updates & Improvements

### September 2025 - P1 Branding & Development Environment

#### ✅ Logo System Implementation
- **New P1 logo components** replacing Bluesky branding throughout the app
- **Custom SVG designs** with ProgressiaOne magenta/purple color scheme
- **Theme integration** ensuring logos adapt to light/dark modes
- **Consistent API** maintaining compatibility with existing usage patterns

#### ✅ ESLint Configuration Fixes
- **Resolved config conflicts** between main project and bskyembed subproject
- **Fixed dependency issues** in bskyembed (downgraded incompatible Vite plugins)
- **Import sorting standardization** across all logo and theme components
- **Pre-commit hooks stabilized** - now consistently catch and prevent common issues

#### ✅ Code Quality Improvements
- **Eliminated unused imports** in theme system (removed BLUE_HUE, GREEN_HUE)
- **Fixed variable shadowing** in multiple utility files
- **Added missing break statements** in switch case logic
- **Cleaned up regex patterns** removing unnecessary escape characters

#### Development Environment Status
- ✅ **Linting**: All packages lint successfully with proper config isolation
- ✅ **Pre-commit hooks**: Working reliably to enforce code standards
- ✅ **TypeScript**: Logo components compile without errors
- ✅ **Theme system**: Brand colors properly integrated across design tokens

### Known Issues Resolved
- **ESLint "preact config not found"** - Fixed by proper dependency management in bskyembed
- **Node version compatibility** - Resolved Vite plugin conflicts in subprojects
- **Import sorting conflicts** - Standardized on inline type imports for consistency

For the complete changelog of recent logo and infrastructure changes, see commit `ed6dbba0b`.
