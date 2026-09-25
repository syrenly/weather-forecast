# Data Model: Recently Viewed Cities

## Core entities

### RecentCity

Represents one city shortcut saved for the current browser.

| Field    | Type   | Required | Notes                                                                              |
| -------- | ------ | -------: | ---------------------------------------------------------------------------------- |
| id       | number |      Yes | Stable city identifier used to navigate to the forecast route.                     |
| name     | string |      Yes | Display name shown in the shortcut.                                                |
| country  | string |      Yes | Country label used in the display text when available.                             |
| viewedAt | number |      Yes | Epoch timestamp used to order the list newest-first and to deduplicate by recency. |

Validation rules:

- `id` must be a positive integer.
- `name` must be a non-empty string.
- `country` is optional when the city record is already known without it; if present it must be a string.
- `viewedAt` must be a valid timestamp and is updated whenever the city is visited again.

### RecentCitiesHistory

Ordered, bounded collection of `RecentCity` records.

| Field    | Type         | Required | Notes                                                  |
| -------- | ------------ | -------: | ------------------------------------------------------ |
| items    | RecentCity[] |      Yes | Newest-first order.                                    |
| maxItems | number       |      Yes | Value is 4, modeled as a single configurable constant. |

Validation rules:

- `items.length <= maxItems`.
- No duplicate `id` values.
- Re-adding an existing city (searched again by button click or search selection) moves it to the front and preserves only one instance; the latest searched city is always first.
- Invalid or malformed stored payloads are discarded and replaced with random sample cities.

## Persistence model

- Persistence key: `weather-forecast:recent-cities`
- Stored format: JSON array of `RecentCity` records.
- Storage failure handling: if storage is blocked, unavailable, or returns invalid JSON, the app falls back to random sample cities without crashing.

## Derived UI representation

### HomeShortcut

A derived view model used by the home page.

| Field | Type   | Notes                            |
| ----- | ------ | -------------------------------- |
| id    | number | Route target id.                 |
| label | string | Display string for the shortcut. |
| route | string | Forecast route for navigation.   |

The home page computes the visible shortcut list as:

1. recent cities in newest-first order,
2. then random sample cities not already included,
3. capped to the configured maximum visible slots.
