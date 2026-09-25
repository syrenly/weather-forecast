# Feature Specification: Recently Viewed Cities on Home

**Created**: 2026-09-24

**Status**: Draft

**Input**: User description: "save in the browser storage the last N selected city and suggest them inside the HomeComponent instead of the list of hard-coded cities"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Quick access to cities I looked at before (Priority: P1)

A returning visitor opens the home page and sees up to 4 buttons, each labeled with a city name. The cities they most recently searched come first, latest first; if fewer than 4, the remaining buttons are filled with random cities. One click opens the forecast for that city.

A city counts as "searched" when the visitor either selects it from the search bar or clicks one of the city buttons.

**Why this priority**: This is the core value of the feature: it turns the home page from a static demo into a personalized starting point and saves the visitor from searching for the same city repeatedly.

**Independent Test**: Open the forecast of three different cities, return to the home page, and verify the three cities are offered as shortcuts, newest first; clicking one opens its forecast.

**Acceptance Scenarios**:

1. **Given** a visitor has searched Rome, Paris and Madrid in that order, **When** they open the home page, **Then** the first three buttons are Madrid, Paris, Rome, followed by one random city, for a total of 4 buttons.
2. **Given** a visitor has searched a city, **When** they close the browser and reopen the application later on the same device, **Then** that city is still offered as the first button.
3. **Given** the visitor searches a city that is already among the buttons, **When** they return to the home page, **Then** the city appears only once, in the first position.
4. **Given** a visitor has searched 4 different cities and then searches a fifth, **When** they return to the home page, **Then** the fifth city is first and the oldest one is no longer shown among the recent cities.
5. **Given** any state of the home page, **When** it is displayed, **Then** every button shows the name of its city.

---

### User Story 2 - Sensible suggestions for first-time visitors (Priority: P2)

A visitor with no history still sees useful buttons, so the home page is never empty.

**Why this priority**: The first visit is the most important impression; random cities from the existing sample list keep it useful and varied.

**Independent Test**: Clear the browser's site data, open the home page, and verify 4 buttons with random city names are shown.

**Acceptance Scenarios**:

1. **Given** no city is stored in the browser, **When** the visitor opens the home page, **Then** 4 buttons are shown, each with a randomly chosen city name and no city repeated.
2. **Given** the browser stores fewer than 4 searched cities, **When** the visitor opens the home page, **Then** the stored cities are shown first, latest first, and the remaining buttons are filled with random cities that are not already listed, until 4 are shown.

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

- The browser blocks or has no available storage (private mode, blocked site data): the application keeps working and shows 4 random cities; nothing crashes and no error is shown.
- The stored data is corrupted or in an unexpected format: it is ignored and replaced, 4 random cities are shown.
- A city is opened by typing its address directly, without using the search or a button: it is not counted as searched and is not recorded.
- The sample list contains fewer than 4 cities in total: all the available cities are shown.
- A city whose forecast fails to load (not found, error) is not added to the history.
- The application runs with the bundled demo data (no valid license): only cities available in the demo data are relevant, and history behaves the same way.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The system MUST record a city in the visitor's history each time the visitor searches it, that is, when they either select it from the search bar or click one of the city buttons.
- **FR-002**: The system MUST keep at most 4 cities in the history; adding a new one beyond the maximum removes the oldest.
- **FR-003**: The system MUST list each city at most once and MUST always keep the latest searched city in the first position, moving an already listed city to the first position when it is searched again.
- **FR-004**: The home page MUST show at most 4 city buttons, each displaying the name of its city and opening the forecast of that city with one action; the stored cities come first, latest first.
- **FR-005**: The home page MUST fill any free button with a random city from the existing sample cities that is not already listed, until 4 buttons are shown; with an empty history all buttons are random cities. It MUST never show an empty list.
- **FR-006**: The history MUST persist across page reloads and browser restarts on the same device.
- **FR-007**: Visitors MUST be able to remove a single city from the history and to clear the whole history.
- **FR-008**: The system MUST keep working, showing random cities, when browser storage is unavailable, full, or contains invalid data.
- **FR-009**: The shortcuts and the remove/clear controls MUST be keyboard operable and have accessible names.
- **FR-010**: The history MUST store only what is needed to display the shortcut (city identifier and display name) and MUST NOT store personal data.

### Key Entities

- **Recent City**: a city the visitor has viewed; attributes: city identifier, display name (name and country), moment of last view.
- **Recent Cities List**: the ordered, bounded collection of Recent Cities, newest first.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: A returning visitor can reopen a previously viewed city from the home page in a single click, without typing.
- **SC-002**: 100% of the cities viewed (up to the maximum) are still offered after a full browser restart.
- **SC-003**: The home page always shows at least one shortcut, including when storage is blocked or the history is empty.
- **SC-004**: The history never exceeds 4 cities and never lists the same city twice; the home page never shows more than 4 buttons.

## Assumptions

- The maximum number of remembered cities and of buttons shown is 4; it is defined as a single configurable constant.
- "Sample cities" means the existing hard-coded list; random cities are picked from it as the fallback.
- The history is per browser and per device; it is not synchronized across devices and there are no user accounts.
- Storing the history does not require a cookie/consent notice because it holds no personal data and is strictly functional.
