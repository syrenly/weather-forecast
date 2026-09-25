# Implementation Plan: Recently Viewed Cities on Home

**Branch**: `001-recent-cities` | **Date**: 2026-09-25 | **Spec**: /specs/001-recent-cities/spec.md

**Input**: Feature specification from `/specs/001-recent-cities/spec.md`

## Summary

Add up to four city buttons (each showing the city name) to the home page. Cities the visitor searched (selected from the search bar or clicked from a button) are persisted in browser storage, ordered newest-first with the latest always first, deduplicated, and limited to four entries. Free buttons are filled with random cities from the sample list, and the same random cities are shown when storage is unavailable, empty, or malformed. The implementation will follow the existing Angular standalone patterns, use signal-based state where appropriate, and keep the storage payload minimal and privacy-safe.

## Technical Context

**Language/Version**: TypeScript with Angular 21 and standalone components.

**Primary Dependencies**: Angular, Angular Material, Angular Router, RxJS, Chart.js, Jasmine/Karma.

**Storage**: Browser `localStorage` with JSON serialization; one app-scoped key for the recent-city list; no backend or user account state.

**Testing**: Jasmine + Karma; unit tests must cover new component/service behavior and preserve the project’s coverage gate.

**Target Platform**: Static browser app served as a frontend-only experience.

**Project Type**: Web application / single-page Angular frontend.

**Performance Goals**: Home page render time stays near-instant; recent list remains capped at four cities and no network request is required on load.

**Constraints**: Must keep at most four entries, record a city on both button click and search selection, never store personal data, keep the app usable when storage is blocked or invalid, and be fully keyboard operable.

**Scale/Scope**: Small local browser state; one feature page and a minimal storage service for a bounded set of city records.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- Pass: Modern Angular, standalone only — new UI remains in the existing standalone pattern and uses `inject()` for dependencies.
- Pass: Test coverage is non-negotiable — any new service or component will ship with a matching `.spec.ts` and use the project’s mock/test utilities.
- Pass: Accessibility first — shortcuts and clear/remove controls must be keyboard accessible and have labels.
- Pass: Code quality gates — work will follow the existing folder-by-type layout under `src/app`, with shared constants in `src/app/consts`.
- Pass: Simplicity and graceful degradation — no new libraries are required; the app keeps showing random sample cities when storage fails or history is empty.

## Project Structure

### Documentation (this feature)

```text
specs/001-recent-cities/
├── plan.md              # This file
├── research.md          # Research decisions and resolved unknowns
├── data-model.md        # Entity and storage design
├── quickstart.md        # Validation scenarios for the feature
├── contracts/           # Storage contract documentation
├── checklist/           # Requirement quality checklist
└── tasks.md             # Phase 2 output (not created yet)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── consts/
│   ├── home/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── ui-components/
│   └── unit-test-utils/
├── assets/
├── styles.scss
├── theme.scss
└── index.html
```

**Structure Decision**: Single Angular frontend app. Recent-city logic belongs in a new or expanded service under `src/app/services`, while the home page remains responsible for rendering the shortcuts and random fallback cities. Storage and ordering rules live in service-level logic, with UI state kept in component-level signals where needed.

## Complexity Tracking

> No violations or exceptions are required for this feature. The design stays within the project’s existing architecture and does not justify additional complexity beyond one storage service and a small UI update.

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ------------------------------------ |
| None      | N/A        | N/A                                  |
