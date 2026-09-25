# Weather Forecast Constitution

## Core Principles

### I. Modern Angular, Standalone Only

The application must be built with the current Angular major version and standalone components only (no NgModules).
Dependencies must be obtained with the `inject()` function, never through constructor injection.
Routes must load their components lazily, and heavy UI (such as charts) must be deferred until needed.
New state and component inputs/outputs must use the signal-based APIs (`signal`, `computed`, `input`, `output`) instead of hand-managed fields and subscriptions, unless a signal API cannot express the need and the plan says why.
Rationale: one consistent, current style keeps the code easy to upgrade and keeps the initial bundle small.

### II. Test Coverage Is Non-Negotiable

Unit test coverage on statements, branches, functions and lines must stay at 100%.
A change that lowers it must justify the drop in the plan, and coverage must NEVER fall below 80%; the 80% floor is a hard gate with no exceptions.
Every new component, service, pipe, guard and resolver must ship with its own `.spec.ts` in the same change.
Third-party services and HTTP calls must be mocked with the helpers in `src/app/unit-test-utils`; tests must NOT call the real OpenWeather API.
Rationale: the API has a limited free quota and is unreliable in CI, and full coverage is what makes refactors and upgrades safe.

### III. Accessibility First

Every UI change must be operable by keyboard and understandable by screen readers.
Dynamic changes (loading, errors, results) must be announced through a live region, and information conveyed only visually (charts, icons, colors) must have a text alternative.
Both the light and dark themes must keep readable contrast.
Rationale: a weather app is used by everyone, and accessibility is far cheaper to build in than to retrofit.

### IV. Code Quality Gates

ESLint and Prettier must pass with no warnings before a change is considered done.
Named constants and enums must be used instead of magic numbers and strings; shared constants live in `src/app/consts`.
Code must follow the existing "folder-by-type" layout (`services`, `pipes`, `routes`, `types`, `ui-components`, ...).

### V. Simplicity and Graceful Degradation

Implementations must be the simplest that meets the spec: do not use external libraries except the ones already installed; an abstraction is added only when at least two current uses need it, or the plan justifies it.
The application must remain usable when the weather API is unavailable, throttled or unlicensed: a failure must show a user-readable message that says what happened and how to continue, never a broken or blank screen, and the bundled dummy data must keep the demo working.
No secret (such as an API license key) may be committed or hard-coded in components; keys must be read through the configuration files and injection tokens.
This is a demo running on a free API tier, so it must fail softly and must never leak credentials.

## Additional Constraints

- **Stack**: Angular, Angular Material and CDK, Chart.js, RxJS, SCSS themes defined in `src/theme.scss`; unit tests run with Jasmine and Karma.
- **Data source**: OpenWeather API (free license). Credits to OpenWeather must be visible in the homepage.
- **Persistence**: The application has no backend. Anything stored on the user's device must live in browser storage, contain no personal data beyond what the feature needs, and tolerate storage being empty, full or blocked.
- **Deployment**: Static hosting (GitHub Pages) and a Docker image; features must work with a configurable base href.

## Development Workflow

1. Pick one item from `TODO.md`, write its spec under `specs/`, then plan, break into tasks and implement.
2. Run `npm run eslint`, `npm run prettier:check` and `npm run test:coverage` before considering the work complete.
3. When a feature ships, tick the item in `TODO.md` and move it to the DONE section.
4. Commit messages use a bracketed category prefix, for example `[a11y]`, `[Security]`, `[Upgrade]`.

## Governance

This constitution supersedes ad-hoc practices. Every spec, plan and review must verify compliance with it, and any deviation must be justified in writing in the plan.
Amendments require updating this file, bumping the version below and noting the reason in the commit message.
Versioning follows semantic versioning:

- MAJOR: a principle is removed or redefined in a backward-incompatible way.
- MINOR: a principle or section is added, or guidance is materially expanded.
- PATCH: clarifications, wording and typo fixes with no change in meaning.

**Version**: 1.1.0 | **Ratified**: 2026-09-24 | **Last Amended**: 2026-09-25
