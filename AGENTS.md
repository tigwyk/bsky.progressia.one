# Repository Guidelines

## Project Structure & Modules
- `src/` – React Native (TypeScript) app code; `#/*` alias maps to `src/*`.
- `assets/` – images, icons, fonts; optimize SVGs with `yarn icons:optimize`.
- `__tests__/` – unit tests (e.g., `*.test.ts`), `__mocks__/` for fixtures.
- `__e2e__/` – Maestro E2E flows and perf tests.
- `modules/` – native modules (Swift/Kotlin) used by the app.
- `bskyweb/`, `bskyembed/` – web/server adjuncts; see Makefile/justfile.
- `docs/` – build and testing docs; start with `docs/build.md`.

## Build, Test, and Development
- Install deps: `yarn` (and `make deps` for embed subpackage).
- Web dev: `yarn web` (Expo web dev server).
- Native dev: `yarn ios` or `yarn android` (see native setup in docs).
- Type check: `yarn typecheck`.
- Lint: `yarn lint` (ESLint) and `yarn lint-native` for Swift/Kotlin.
- Unit tests: `yarn test`, watch: `yarn test-watch`, coverage: `yarn test-coverage`.
- E2E tests: `yarn e2e:mock-server`, `yarn e2e:metro`, `yarn e2e:run`.
- Web export: `make build-web` or `just dist-build-web`.

## Coding Style & Naming
- Language: TypeScript + React (React Native + Web).
- Formatting: Prettier (no semicolons, single quotes, trailing commas).
- Linting: ESLint with custom rules (`eslint/`), simple-import-sort, typed imports.
- Imports: prefer exact, inline type imports; use `#/*` alias for `src/*`.
- Components: PascalCase; hooks/vars camelCase; tests `*.test.ts(x)`.

## Testing Guidelines
- Framework: Jest (preset `jest-expo`); tests live in `__tests__/`.
- E2E: Maestro flows in `__e2e__/`; see `docs/testing.md`.
- Coverage: available via `yarn test-coverage` (no strict threshold enforced).
- Snapshot/UI tests welcome; avoid brittle timing-based tests.

## Commit & Pull Requests
- Commits: short, imperative subject (optionally `feat:`, `fix:`, `chore:`). Group related changes.
- PRs: clear description, linked issue(s), screenshots for UI, notes on risk/rollout.
- Include: tests for behavior changes, docs updates when applicable.
- Keep diffs focused; avoid sweeping refactors in feature PRs.

## Security & Configuration
- Copy `.env.example` to `.env` (and `.env.test` for tests). Do not commit secrets.
- Native builds require `google-services.json` (example provided).
- Sentry sourcemap/upload and EAS settings are documented in `docs/build.md`.

## Agent Notes
- Follow these guidelines for any automated edits. Keep changes minimal, aligned with ESLint/Prettier, and confined to the relevant module.
