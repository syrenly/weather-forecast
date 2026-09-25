# Tasks: Recently Viewed Cities on Home

**Input**: Design documents from `/specs/001-recent-cities/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the minimal feature structure and shared constants for the city history feature.

- [x] T001 Create the feature storage and home-page extension structure under `src/app/services` and `src/app/home` with the folder-by-type layout described in the plan
- [x] T002 [P] Add the recent-city storage constant and default maximum value in `src/app/consts/consts.ts` using the existing naming and constant style
- [x] T003 [P] Extend the city type contracts in `src/app/types/city-types.ts` to cover the recent-city record, ordered history list, and minimal display fields required by the home page

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build the reusable browser-storage logic and validation rules before any story can implement the UI.

**Checkpoint**: Foundational storage logic is ready; user story work can begin in parallel.

- [x] T004 Implement the recent-city history model and validation rules in `src/app/services/recent-cities.service.ts`, including "at most 6 entries", newest-first ordering, and deduplication by city id
- [x] T005 [P] Add safe browser storage read/write helpers to `src/app/services/recent-cities.service.ts` that handle missing keys, invalid JSON, blocked storage, and malformed records without crashing the app
- [x] T006 [P] Add the service API for adding a viewed city, removing a single city, and clearing the full history in `src/app/services/recent-cities.service.ts`
- [x] T007 Implement the fallback logic in `src/app/services/recent-cities.service.ts` that returns sample cities when no recent history exists or storage is invalid

---

## Phase 3: User Story 1 - Quick access to cities I looked at before (Priority: P1) 🎯 MVP

**Goal**: Show a recent-city shortcut list on the home page, newest first, with one-click navigation to the forecast route.

**Independent Test**: Open the forecast for three different cities, return to the home page, and verify the list shows them in newest-first order and clicking a shortcut opens the correct forecast.

### Implementation for User Story 1

- [x] T008 [US1] Update the home page state and view model in `src/app/home/home.component.ts` to merge recent-city shortcuts with the current sample-city list while preserving the existing component pattern
- [x] T009 [US1] Update `src/app/home/home.component.html` to render accessible recent-city shortcut buttons that are keyboard-operable and match the existing Angular Material styling
- [x] T010 [US1] Wire the click navigation and route behavior in `src/app/home/home.component.ts` so each recent shortcut resolves to `/forecast/:id` and follows the existing router conventions

**Checkpoint**: At this point, User Story 1 should be fully functional and independently testable.

---

## Phase 4: User Story 2 - Sensible suggestions for first-time visitors (Priority: P2)

**Goal**: Keep the home page useful even when the visitor has no saved history or limited history and never show an empty list.

**Independent Test**: Clear browser storage, open the home page, and confirm the fallback sample cities are still shown; then add a partial history and verify remaining slots are filled with sample cities not already present.

### Implementation for User Story 2

- [x] T011 [P] [US2] Extend the home-page composition logic in `src/app/home/home.component.ts` so recent cities are shown first and leftover slots are filled with sample cities that are not already in the recent list
- [x] T012 [US2] Add the no-history and partial-history fallback flow in `src/app/services/recent-cities.service.ts` so the service returns the correct ordered list when storage is empty or contains fewer than the max number of items
- [x] T013 [US2] Update `src/app/home/home.component.html` to preserve the visible fallback list when the recent history is empty, invalid, or shorter than the configured maximum

**Checkpoint**: At this point, User Stories 1 and 2 should both work independently.

---

## Phase 5: User Story 3 - Control over my history (Priority: P3)

**Goal**: Let visitors remove one entry or clear the full history while keeping the page and storage state in sync.

**Independent Test**: Populate history, remove one item, clear all, then reload the page and confirm the state persists and the fallback sample cities are shown again.

### Implementation for User Story 3

- [x] T014 [P] [US3] Add the remove-one and clear-all actions to `src/app/services/recent-cities.service.ts` and persist the updated recent-city list immediately
- [x] T015 [US3] Add the corresponding controls and actions to `src/app/home/home.component.html` and `src/app/home/home.component.ts`, including accessible button text and keyboard support
- [x] T016 [US3] Ensure the home page refreshes correctly after each mutation in `src/app/home/home.component.ts` and that the invalid-storage handling remains intact across reloads

**Checkpoint**: All user stories should now be independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, cleanup, and compliance checks across the whole feature.

- [x] T017 [P] Run the project validation commands required by the constitution in the repository root and fix any lint, formatting, or test regressions introduced by the recent-city feature
- [x] T018 [P] Validate the end-to-end quickstart scenarios in `specs/001-recent-cities/quickstart.md` against the actual home-page behavior in `src/app/home/home.component.html` and `src/app/home/home.component.ts`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion and blocks all user-story work.
- **User Stories (Phase 3+)**: Depend on Foundational completion.
- **Polish (Final Phase)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Phase 2; no dependencies on other stories.
- **User Story 2 (P2)**: Can start after Phase 2; independent from User Story 1 but should share the same data contract.
- **User Story 3 (P3)**: Can start after Phase 2; independent from the other stories and can run in parallel if staffing allows.

### Parallel Opportunities

- Phase 1 tasks T002 and T003 can run in parallel.
- Phase 2 tasks T005 and T006 can run in parallel.
- User Story 1 tasks T008, T009, and T010 are all on the same feature area but can be split across a small team if needed.
- User Story 2 tasks T011 and T012 can advance in parallel after the service contract exists.
- User Story 3 tasks T014 and T015 can proceed in parallel after the service API is ready.
- Final validation tasks T017 and T018 can run in parallel once all story work is complete.

---

## Parallel Example: User Story 1

```bash
# Recommended parallel split after the foundational phase is complete
Task: "Update home-page state and merge recent-city list in src/app/home/home.component.ts"
Task: "Render accessible shortcut buttons in src/app/home/home.component.html"
Task: "Wire route navigation in src/app/home/home.component.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational.
3. Complete Phase 3: User Story 1.
4. Validate the home page behavior independently.
5. Stop and confirm the feature is usable before moving forward.

### Incremental Delivery

1. Foundation first: storage logic, validation, and fallback rules.
2. Add User Story 1: recent shortcuts appear and open city forecasts.
3. Add User Story 2: sample-city fallback for empty or partial histories.
4. Add User Story 3: remove one item and clear all history.
5. Finish with polish and cross-cutting validation.

### Team Strategy

With multiple developers:

1. One developer completes the storage contract and foundation tasks.
2. Another developer handles the home-page rendering and navigation in User Story 1.
3. A third developer can work on fallback and history controls for User Stories 2 and 3 in parallel.
4. Final validation runs after all story phases complete.

---

## Notes

- [P] tasks indicate independent work that can run in parallel when different files are involved.
- Story labels map each task to the relevant user story for traceability.
- All tasks are intentionally scoped to the existing Angular structure, browser-storage contract, and folder-by-type layout required by the project constitution.
- The generated task list is designed to be directly actionable by an LLM or developer without requiring additional design context.
