# Validation Task

- change-id: `stabilize-places-map-v1-and-admin-metadata`
- run#: `0009`
- task-id: `3.1`
- ref-id: `R6`
- scope: `MIXED`

## Purpose

Validate that the mobile places map page stays frozen as a marker-only summary flow with marker loading, marker selection, and map-to-detail navigation that does not depend on marker-triggered detail fetches.

## How To Run

- macOS/Linux: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0009__task-3.1__ref-R6__20260418T073500Z/run.sh`
- Windows: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0009__task-3.1__ref-R6__20260418T073500Z/run.bat`

## Inputs

- Repository working tree with local dependencies already available under `node_modules/`
- Mobile map page:
  - `apps/mobile/src/pages/places/map.vue`
- Mobile TypeScript project:
  - `apps/mobile/tsconfig.json`
- GUI verification runbook:
  - `tests/gui_runbook_places_map.md`

## Outputs

- Mobile typecheck output
- Log files:
  - `logs/mobile-typecheck.log`
- Manual/MCP evidence captured by following the GUI runbook

## Expected Results

- The run script exits with code `0`
- Mobile typecheck exits successfully
- GUI verification confirms:
  - map markers load without fetching place detail on marker tap
  - tapping a marker changes the selected summary card
  - the summary card shows only marker-safe fields: localized name, top-level category, recommendation state, and detail CTA
  - the detail CTA navigates into the place detail page for the selected marker

## Provenance

- Expectations are derived directly from task `3.1` acceptance criteria in `openspec/changes/stabilize-places-map-v1-and-admin-metadata/tasks.md`
