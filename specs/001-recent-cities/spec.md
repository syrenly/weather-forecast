# Feature Specification: Recently Viewed Cities on Home

**Created**: 2026-09-24

**Status**: Draft

**Input**: User description: "save in the browser storage the last N selected city and suggest them inside the HomeComponent instead of the list of hard-coded cities"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Quick access to cities I looked at before (Priority: P1)

A returning visitor opens the home page and sees shortcuts to the cities they most recently viewed, most recent first, instead of a generic list of sample cities. One click opens the forecast for that city.

**Why this priority**: This is the core value of the feature: it turns the home page from a static demo into a personalized starting point and saves the visitor from searching for the same city repeatedly.

**Independent Test**: Open the forecast of three different cities, return to the home page, and verify the three cities are offered as shortcuts, newest first; clicking one opens its forecast.

**Acceptance Scenarios**:

1. **Given** a visitor has viewed the forecasts of Rome, Paris and Madrid in that order, **When** they open the home page, **Then** the shortcuts are shown in the order Madrid, Paris, Rome.
2. **Given** a visitor has viewed a city, **When** they close the browser and reopen the application later on the same device, **Then** that city is still offered as a shortcut.
3. **Given** the visitor views a city that is already in their recent list, **When** they return to the home page, **Then** the city appears only once, in the first position.

---

### User Story 2 - Sensible suggestions for first-time visitors (Priority: P2)

A visitor with no history still sees useful shortcuts, so the home page is never empty.

**Why this priority**: The first visit is the most important impression, and the current sample cities already cover it; this story preserves that behavior as a fallback.

**Independent Test**: Clear the browser's site data, open the home page, and verify the sample cities are shown.

**Acceptance Scenarios**:

1. **Given** a visitor has never viewed a city, **When** they open the home page, **Then** the existing sample cities are shown as shortcuts.
2. **Given** a visitor has viewed fewer cities than the maximum shown, **When** they open the home page, **Then** their recent cities are shown first and the remaining slots are filled with sample cities that are not already listed.

---

### User Story 3 - Control over my history (Priority: P3)

A visitor can remove a single city from the list, or clear the whole history, so the suggestions stay relevant and private.

**Why this priority**: Convenience and privacy, but the feature is already valuable without it.

**Independent Test**: With a populated history, remove one city and clear all; verify the shortcuts update immediately and remain updated after a page reload.

**Acceptance Scenarios**:

1. **Given** a populated history, **When** the visitor removes one city, **Then** it disappears from the shortcuts immediately and does not return after reloading the page.
2. **Given** a populated history, **When** the visitor clears the whole history, **Then** the sample cities are shown again.

---

### Edge Cases

- The browser blocks or has no available storage (private mode, blocked site data): the application keeps working and shows the sample cities; nothing crashes and no error is shown.
- The stored data is corrupted or in an unexpected format: it is ignored and replaced, the sample cities are shown.
- A city is opened by typing its address directly, without using the search: it is still recorded once its forecast loads successfully.
- A city whose forecast fails to load (not found, error) is not added to the history.
- The application runs with the bundled demo data (no valid license): only cities available in the demo data are relevant, and history behaves the same way.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST record a city in the visitor's history each time its forecast is successfully displayed, regardless of how the visitor reached it (search, shortcut, direct address).
- **FR-002**: The system MUST keep at most a fixed number of cities in the history (default: 6); adding a new one beyond the maximum removes the oldest.
- **FR-003**: The system MUST list each city at most once, moving an already listed city to the first position when it is viewed again.
- **FR-004**: The home page MUST show the recent cities, most recent first, as shortcuts that open the forecast of that city with one action.
- **FR-005**: The home page MUST fill any free shortcut slots with the existing sample cities that are not already in the history, so it never shows an empty list.
- **FR-006**: The history MUST persist across page reloads and browser restarts on the same device.
- **FR-007**: Visitors MUST be able to remove a single city from the history and to clear the whole history.
- **FR-008**: The system MUST keep working, showing the sample cities, when browser storage is unavailable, full, or contains invalid data.
- **FR-009**: The shortcuts and the remove/clear controls MUST be keyboard operable and have accessible names.
- **FR-010**: The history MUST store only what is needed to display the shortcut (city identifier and display name) and MUST NOT store personal data.

### Key Entities

- **Recent City**: a city the visitor has viewed; attributes: city identifier, display name (name and country), moment of last view.
- **Recent Cities List**: the ordered, bounded collection of Recent Cities, newest first.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A returning visitor can reopen a previously viewed city from the home page in a single click, without typing.
- **SC-002**: 100% of the cities viewed (up to the maximum) are still offered after a full browser restart.
- **SC-003**: The home page always shows at least one shortcut, including when storage is blocked or the history is empty.
- **SC-004**: The history never exceeds the configured maximum and never lists the same city twice.

## Assumptions

- The maximum number of remembered cities is 6, matching the number of shortcuts shown today for the demo data; it is defined as a single configurable constant.
- "Sample cities" means the existing hard-coded list, kept as the fallback rather than removed.
- The history is per browser and per device; it is not synchronized across devices and there are no user accounts.
- Storing the history does not require a cookie/consent notice because it holds no personal data and is strictly functional.
