# GUI Runbook: Places Map Marker-Only Summary

Use MCP browser or simulator control only.

## Preconditions

1. Run the compile safety command documented in `../task.md` and record its exit code in evidence.
2. Start the mobile app in the target environment you are using for MCP interaction.
3. Seed or use data where at least two published places with valid coordinates are available.

## Verification Steps

1. Open the `Places` map page.
2. Confirm the page loads map markers from the marker endpoint and renders a selected summary card.
3. Capture the initial summary card and verify it shows:
   - localized place name
   - `category_level_1`
   - recommendation badge only when `is_recommended` is true
   - a CTA to open place detail
4. Confirm the summary card does not show coordinates, address text, intro text, gallery, or navigation data.
5. Tap a different map marker.
6. Confirm the selected summary card changes to the newly tapped marker without any intermediate detail-loading state on the map page.
7. Use the summary-card CTA to open the place detail page.
8. Confirm the app navigates to the matching place detail screen for the selected marker.

## Assertion Points

- Screenshot the initial selected summary card.
- Screenshot the post-selection summary card for a different marker.
- Screenshot the detail page reached from the summary-card CTA.
- Record whether any marker-triggered detail-loading spinner or detail-prefetch behavior was observed on the map page.
