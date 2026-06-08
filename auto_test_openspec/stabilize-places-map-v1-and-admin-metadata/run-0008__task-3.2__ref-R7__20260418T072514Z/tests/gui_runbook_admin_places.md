# GUI Runbook: Admin Places Editor

Use MCP browser control only.

## Preconditions

1. Run the compile safety command documented in `../task.md` and record its exit code in evidence.
2. Start the admin app using `../run.sh` or `../run.bat`.
3. Open the served admin URL and authenticate as the mock admin user if prompted.

## Verification Steps

1. Open the `Places` admin page.
2. Confirm `category_level_1` renders as a controlled select, not a free-text field.
3. Open the category select and confirm the available values include:
   - `public-service`
   - `food-drink`
   - `shopping`
   - `lifestyle`
   - `education`
   - `health-wellness`
   - `entertainment`
   - `outdoor-sports`
   - `transport`
   - `community`
4. Confirm `status` renders as a controlled select with supported place statuses.
5. Enter an invalid value case by clearing or breaking a required field and attempt to submit.
6. Confirm the UI blocks submission and surfaces a validation error message derived from schema validation.
7. Restore a valid payload, submit it, and confirm the editor accepts the shared taxonomy value and metadata fields.

## Assertion Points

- Screenshot the category select options.
- Screenshot the status select options.
- Screenshot the validation error state for an invalid submit.
- Screenshot the post-submit editor/table state for a valid save.
