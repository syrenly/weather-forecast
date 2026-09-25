# Feature Specification: Refresh Forecast Data

**Created**: 2026-09-24

**Status**: Draft

**Input**: User description: "refresh button or periodic refresh of the data"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Manual refresh (Priority: P1)

While viewing a city's forecast, the visitor presses a "Refresh" button to reload the current weather and the five-day forecast without leaving the page or changing city.

**Why this priority**: Weather data goes stale; a visitor who keeps the page open needs a simple way to get up-to-date information, and a button is the least surprising mechanism.

**Independent Test**: Open a forecast, press Refresh, and verify the data is reloaded, a loading state is shown while it happens, and the "last updated" time changes.

**Acceptance Scenarios**:

1. **Given** a forecast is displayed, **When** the visitor presses Refresh, **Then** a loading indicator appears and the weather and forecast are replaced with fresh data.
2. **Given** a refresh is in progress, **When** the visitor presses Refresh again, **Then** no second request is started.
3. **Given** the refresh succeeds, **When** the data is shown, **Then** a "last updated" time reflects the moment of the latest successful load.

---

### User Story 2 - Failed refresh keeps what I have (Priority: P1)

If a refresh fails, the visitor keeps seeing the last successfully loaded data and is told the refresh failed, instead of the whole page being replaced by an error.

**Why this priority**: Replacing good data with an error screen because of a temporary network glitch would make the feature harmful.

**Independent Test**: Simulate a failing request during a refresh and verify the previous data remains, a message is shown and announced, and the visitor can retry.

**Acceptance Scenarios**:

1. **Given** data is displayed, **When** a refresh fails, **Then** the previous data stays visible and a non-blocking message says the update failed.
2. **Given** the failure message is shown, **When** the visitor presses Refresh again and it succeeds, **Then** the message disappears and the data is updated.
3. **Given** a screen reader is in use, **When** a refresh starts, succeeds or fails, **Then** the outcome is announced.

---

### User Story 3 - Automatic periodic refresh (Priority: P3)

While the forecast page is open and visible, the data refreshes by itself at a reasonable interval, so a display left open all day stays current.

**Why this priority**: Nice for always-on use, but it consumes limited API quota, so it comes after the manual option and must be conservative.

**Independent Test**: Keep a forecast open past the refresh interval and verify one refresh happens; switch to another tab or leave the page and verify no refreshes happen meanwhile.

**Acceptance Scenarios**:

1. **Given** a forecast is open and the tab is visible, **When** the refresh interval elapses, **Then** the data is refreshed automatically.
2. **Given** the tab is hidden or the visitor left the forecast page, **When** the interval elapses, **Then** no request is made.
3. **Given** the tab becomes visible again after a long time, **When** the data is older than the interval, **Then** it is refreshed once.

---

### Edge Cases

- The application is using bundled demo data: refreshing works but returns the same demo data; the "last updated" time still updates.
- The API answers "too many requests": the refresh fails gracefully with the existing message, and automatic refresh backs off instead of retrying quickly.
- The visitor changes city while a refresh is in flight: the outdated response is discarded and never overwrites the new city.
- The device goes offline: refresh fails with a clear message; automatic refresh resumes when connectivity returns and the next interval elapses.
- Automatic refresh must not run continuously in a hidden tab, to protect the limited API license quota.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The forecast page MUST provide a Refresh control that reloads both the current weather and the five-day forecast for the displayed city.
- **FR-002**: The system MUST show a loading state during a refresh and MUST NOT start a new refresh while one is in progress.
- **FR-003**: The system MUST display the time of the last successful update.
- **FR-004**: When a refresh fails, the system MUST keep the previously displayed data and show a non-blocking, announced message with the reason category (limit reached, license problem, connection, generic).
- **FR-005**: The system MUST refresh automatically at a fixed interval (default: 10 minutes) only while the forecast page is displayed and the browser tab is visible.
- **FR-006**: The system MUST discard the response of a refresh that no longer matches the displayed city.
- **FR-007**: Automatic refresh MUST be stopped when the visitor leaves the page and MUST NOT accumulate timers or requests after repeated visits.
- **FR-008**: The Refresh control MUST be keyboard operable, have an accessible name, and expose its busy/disabled state to assistive technology; results MUST be announced.
- **FR-009**: The refresh interval MUST be defined as a single named configuration value.

### Key Entities

- **Forecast Snapshot**: the current weather and five-day forecast for a city together with the time they were last loaded successfully.
- **Refresh State**: idle, refreshing, or failed (with reason), used to drive the display and prevent duplicate requests.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor can update the displayed forecast with a single action, without leaving the page.
- **SC-002**: In 100% of failed refreshes the previous data remains visible.
- **SC-003**: With the page open and visible for one hour, no more than 6 automatic refreshes occur; with the tab hidden or the page closed, zero occur.
- **SC-004**: The time of last update is always visible and correct after every successful refresh.

## Assumptions

- The default automatic interval is 10 minutes, since the source service updates its data on the order of tens of minutes; this can be tuned in a single place.
- Automatic refresh applies only to the forecast page, not the home page.
- Both manual and automatic refresh reuse the same loading and error handling as the initial load wherever possible.
- The free API license has a limited request volume, so conservative defaults are preferred over aggressive polling.
