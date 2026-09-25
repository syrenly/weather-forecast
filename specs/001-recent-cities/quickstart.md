# Quickstart: Recently Viewed Cities

## Goal

Validate that recent cities persist locally, deduplicate correctly, and still show sample cities when storage is unavailable or empty.

## Prerequisites

- Run the Angular app locally with the existing project setup.
- Use a browser with storage enabled.

## Validation scenarios

### 1. First visit fallback

1. Clear browser storage for the app.
2. Open the home page.
3. Confirm the sample city list is shown.
4. Confirm there are no errors and the page remains usable.

### 2. Record and reorder history

1. Open the forecast for Rome.
2. Open the forecast for Paris.
3. Open the forecast for Madrid.
4. Return to the home page.
5. Confirm the list appears as Madrid, Paris, Rome with newest first.

### 3. Deduplication and limit

1. Open a city already in the recent list.
2. Confirm it moves to the first position and appears only once.
3. Continue viewing enough cities to exceed the maximum count.
4. Confirm the oldest city is evicted and the list still has at most the configured maximum.

### 4. Persistence across reload

1. Visit several cities and return home.
2. Reload the page.
3. Confirm the previous sequence still appears on the home page.

### 5. Storage failure fallback

1. Simulate blocked or invalid local storage.
2. Refresh the home page.
3. Confirm the app still renders sample cities and no crash occurs.

## Expected outcome

The feature meets the acceptance scenarios from the spec and degrades gracefully when browser storage is unavailable or invalid.
