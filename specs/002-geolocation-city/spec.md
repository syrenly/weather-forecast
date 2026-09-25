# Feature Specification: Open My Local Forecast

**Created**: 2026-09-24

**Status**: Draft

**Input**: User description: "ask users to retrieve their location and open directly their city"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - See the forecast for where I am (Priority: P1)

On the home page, a visitor chooses "Use my location". The application asks for permission to read the device location; once granted, it finds the nearest city and opens its forecast directly.

**Why this priority**: This is the whole feature: it removes the need to type a city name for the most common intent, "what's the weather where I am?".

**Independent Test**: On a device with location available, click the control, grant permission, and verify the forecast of the city where the device is located opens.

**Acceptance Scenarios**:

1. **Given** the visitor is on the home page, **When** they choose "Use my location" and grant permission, **Then** they are taken to the forecast of the nearest city.
2. **Given** the location is being determined, **When** the visitor waits, **Then** they see a clear "locating" state and cannot trigger duplicate requests.
3. **Given** the visitor previously granted permission, **When** they choose the control again, **Then** the forecast opens without asking again (the browser's own behavior).

---

### User Story 2 - Clear guidance when it does not work (Priority: P2)

If permission is denied, the location is unavailable, it times out, or no city is found nearby, the visitor gets a plain-language message and can continue with the normal search.

**Why this priority**: Location often fails or is refused; a dead end here would make the feature worse than not having it.

**Independent Test**: Deny the permission prompt and verify a helpful message appears and the search still works.

**Acceptance Scenarios**:

1. **Given** the visitor denies permission, **When** the request ends, **Then** a message explains that location access was refused and how to search manually; the rest of the page keeps working.
2. **Given** the device cannot determine a position or times out, **When** the request ends, **Then** a message says the location is unavailable and suggests searching manually.
3. **Given** no city can be matched to the position, **When** the request ends, **Then** a message says no nearby city was found.
4. **Given** the message is displayed, **When** a screen reader is in use, **Then** the message is announced.

---

### User Story 3 - Never intrusive (Priority: P3)

The application never asks for location on its own at page load; it only asks when the visitor explicitly chooses to. The control is hidden when the device or browser does not support locating.

**Why this priority**: An unrequested permission prompt is a well-known usability and trust problem; this story keeps the feature respectful.

**Independent Test**: Load the home page and verify no permission prompt appears until the control is used; load it in an environment without location support and verify the control is not offered.

**Acceptance Scenarios**:

1. **Given** the visitor opens the home page, **When** they do nothing, **Then** no location permission prompt appears.
2. **Given** the environment does not support locating, **When** the home page loads, **Then** the "Use my location" control is not shown.

---

### Edge Cases

- The visitor's location is outside any known city (open sea, remote area): the nearest available city is used only if reasonably close; otherwise the "no nearby city" message is shown.
- The visitor triggers the control several times quickly: only one request is in flight.
- The visitor leaves the page while locating: the pending request is discarded and no navigation happens afterward.
- The page is served over an insecure connection where locating is blocked: treated as "unavailable".
- The application runs with bundled demo data: the nearest city among the demo cities is used, or the control explains that location lookup is not available in demo mode.
- The detected position is never stored, logged or sent anywhere other than to the weather service to identify the city.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The home page MUST offer an explicit "Use my location" control.
- **FR-002**: The system MUST request the device location only after the visitor activates that control, never automatically.
- **FR-003**: On success, the system MUST identify the city nearest to the reported position and navigate to its forecast.
- **FR-004**: The system MUST show a visible "locating" state while waiting and MUST prevent concurrent duplicate requests.
- **FR-005**: The system MUST show a specific, user-friendly message for each failure: permission denied, position unavailable, timeout, no nearby city, and the weather service being unreachable.
- **FR-006**: After any failure, the rest of the home page, including manual search, MUST remain fully usable.
- **FR-007**: The control MUST NOT be shown when the environment does not support locating.
- **FR-008**: The control and all its states and messages MUST be keyboard operable, have accessible names, and announce results and errors to assistive technology.
- **FR-009**: The system MUST NOT persist the visitor's coordinates.
- **FR-010**: A successfully opened city SHOULD be treated like any other viewed city (for example, it is added to the recent cities history if that feature is present).

### Key Entities

- **Device Position**: the visitor's latitude and longitude, used transiently to find a city and then discarded.
- **Nearest City**: the city returned by the weather service for the position; attributes: identifier, name, country.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: A visitor who grants permission reaches their local forecast in a single action from the home page, without typing.
- **SC-002**: In 100% of failure cases (denied, unavailable, timeout, no city) the visitor sees a specific message and can continue searching manually.
- **SC-003**: No location permission prompt is ever shown before the visitor activates the control.
- **SC-004**: In a typical connection, the forecast opens within 5 seconds of the visitor granting permission.

## Assumptions

- The weather service already used by the application provides a way to find the nearest city from coordinates; no new service or account is needed.
- A "nearest city" match is accepted when the service returns a result; a stricter distance threshold is not defined for this first version.
- Coordinates are not exposed to the visitor in the interface.
- The feature targets the same browsers as the rest of the application and relies on the browser's built-in location capability and its permission prompt.
