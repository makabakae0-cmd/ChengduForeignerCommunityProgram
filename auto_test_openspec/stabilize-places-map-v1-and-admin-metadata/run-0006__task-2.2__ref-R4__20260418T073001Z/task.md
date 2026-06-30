# Validation Task

- change-id: `stabilize-places-map-v1-and-admin-metadata`
- run#: `0006`
- task-id: `2.2`
- ref-id: `R4`
- scope: `CLI`

## Purpose

Validate that the public marker response stays separate from place detail payloads across the Koa route path and the CloudBase execution path.

## How To Run

- macOS/Linux: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0006__task-2.2__ref-R4__20260418T073001Z/run.sh`
- Windows: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0006__task-2.2__ref-R4__20260418T073001Z/run.bat`

## Inputs

- Repository working tree with local dependencies already available under `node_modules/`
- API test files:
  - `apps/api/test/app.spec.ts`
  - `apps/api/test/cloudbase.spec.ts`

## Outputs

- Console Vitest output
- Log file:
  - `logs/vitest.log`

## Expected Results

- The run script exits with code `0`
- Vitest executes the targeted API test files only
- The log confirms:
  - marker objects expose only `_id`, `name_zh`, `name_en`, `category_level_1`, `is_recommended`, and `location`
  - marker objects do not expose `gallery_urls`, `navigation`, or address-body fields
  - marker payload shape remains aligned across the Koa route path and the CloudBase execution path
- The log does not report failed test files or failed tests

## Provenance

- Expectations are derived directly from task `2.2` acceptance criteria in `openspec/changes/stabilize-places-map-v1-and-admin-metadata/tasks.md`
