# Validation Task

- change-id: `stabilize-places-map-v1-and-admin-metadata`
- run#: `0008`
- task-id: `3.2`
- ref-id: `R7`
- scope: `MIXED`

## Purpose

Validate that the admin places editor uses the shared category taxonomy and aligns its submit behavior with backend validation.

## How To Run

- macOS/Linux: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0008__task-3.2__ref-R7__20260418T072514Z/run.sh`
- Windows: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0008__task-3.2__ref-R7__20260418T072514Z/run.bat`

## Inputs

- Repository working tree with local dependencies already available under `node_modules/`
- Admin app project:
  - `apps/admin`
- GUI runbook:
  - `tests/gui_runbook_admin_places.md`

## Outputs

- Start-server console output from `run.sh` / `run.bat`
- Expected GUI evidence captured by the Supervisor under:
  - `outputs/screenshots/`
  - `logs/`

## Required Preparation

- Run admin compile safety check before GUI verification:
  - macOS/Linux:
    - `./apps/admin/node_modules/.bin/vue-tsc -p apps/admin/tsconfig.json --noEmit`
  - Windows:
    - `.\apps\admin\node_modules\.bin\vue-tsc.cmd -p apps\admin\tsconfig.json --noEmit`
- Start the admin app with `run.sh` or `run.bat`
- Execute only the MCP runbook under `tests/gui_runbook_admin_places.md`

## Expected Results

- The compile safety command exits with code `0`
- The admin page exposes `category_level_1` as a controlled select using the shared supported values
- The admin page exposes `status` as a controlled select using supported place statuses
- Invalid submit attempts are blocked in the UI using the same request-schema rules enforced by the backend
- A valid create or update flow can submit shared-taxonomy values and metadata fields without drifting from backend validation

## Hard Rules

- `run.sh` / `run.bat` are start-server only for this MIXED bundle
- GUI verification must follow `tests/gui_runbook_admin_places.md`
- Do not use scripted browser automation outside the MCP runbook

## Provenance

- Expectations are derived directly from task `3.2` acceptance criteria in `openspec/changes/stabilize-places-map-v1-and-admin-metadata/tasks.md`
