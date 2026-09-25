# Research: Recently Viewed Cities

## Decisions

### 1. Browser storage will be the persistence mechanism

- Decision: persist the recent-city list in `localStorage` under a single app-scoped key such as `weather-forecast:recent-cities`.
- Rationale: the product requirement is device-local, session-independent, and has no backend. `localStorage` matches the constitution’s browser-storage guidance and keeps the list available after reload and browser restart.
- Alternatives considered:
    - `sessionStorage`: rejected because it clears when the browser tab/session ends, which violates the persistence requirement.
    - In-memory state only: rejected because it does not survive reloads and would fail the acceptance scenarios.

### 2. Store the minimum data for display and ordering

- Decision: store an ordered list of recent-city records containing only the city identifier, display name, and the time it was last viewed.
- Rationale: the spec explicitly requires the history to contain only the minimum data needed to display the shortcut and not personal data.
- Alternatives considered:
    - Full weather payloads: rejected because they are larger than needed and contradict the privacy requirement.
    - User account sync: rejected because the app has no backend or account model.

### 3. Keep a shared fallback list of sample cities

- Decision: preserve the existing sample city list as the no-history fallback and fill remaining slots with sample cities not already in the recent list.
- Rationale: this avoids an empty home screen and preserves the current experience for first-time visitors.
- Alternatives considered:
    - Empty state only: rejected because it breaks first-visit UX and the acceptance scenarios.
    - Replacing sample cities entirely: rejected because it removes the current demo fallback and is not required by the spec.

### 4. Use signals for UI-driven state updates

- Decision: model the recent list as a `signal`-backed service state, updating Reactively when list changes and exposing read-only derived data such as ordered shortcuts and counts.
- Rationale: the constitution requires signal-based APIs for new state and component inputs/outputs wherever possible and this project already uses `signal`, `computed`, and `input` patterns.
- Alternatives considered:
    - plain class fields with manual refresh: rejected because it is less aligned with the project’s current Angular patterns.
    - RxJS-only state wrappers: rejected because the app already uses signals in UI components and the feature is small enough for a simple signal service.

## Open Issues Resolved

- No feature-level clarifications remain open; the spec is specific enough to proceed to design and tasking.
- Storage edge cases are covered by the specification: blocked storage, invalid data, and enqueued deduplication rules are included as acceptance and failure requirements.
