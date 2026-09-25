# Recent Cities Storage Contract

## Purpose

The browser stores a bounded list of cities the user has viewed so the home page can offer them as shortcuts after reload.

## Persistence contract

### Key

`weather-forecast:recent-cities`

### Value format

A JSON array of objects matching the `RecentCity` shape:

```json
[
	{
		"id": 5128581,
		"name": "Rome",
		"country": "IT",
		"viewedAt": 1727278800000
	}
]
```

### Contract rules

- The array is ordered newest-first.
- Each item must have a unique `id`.
- `id`, `name`, and `viewedAt` are required.
- The array must not exceed the configured maximum count.
- Invalid JSON or invalid item shapes must be treated as empty history and ignored.

### Read behavior

- If the key does not exist, return an empty list.
- If the value cannot be parsed, return an empty list.
- If any item is structurally invalid, filter it out and continue reading valid records.

### Write behavior

- When a city is viewed successfully, the list is updated atomically in browser storage.
- If the city already exists, move it to the first position and refresh `viewedAt`.
- If the list exceeds the maximum, drop the oldest entries.

### UI contract

- The home page receives the ordered list and renders shortcut buttons for the recent list and remaining sample cities.
- Storage failures do not block rendering; the fallback sample city list is displayed instead.
