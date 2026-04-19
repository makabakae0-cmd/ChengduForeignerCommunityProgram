# Validation Task

- change-id: `stabilize-places-map-v1-and-admin-metadata`
- run#: `0005`
- task-id: `2.1`
- ref-id: `R3`
- scope: `CLI`

## Purpose

Validate public marker visibility and deterministic ordering semantics across the mock-backed Koa route path and the CloudBase execution path.

## How To Run

- macOS/Linux: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0005__task-2.1__ref-R3__20260418T073000Z/run.sh`
- Windows: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0005__task-2.1__ref-R3__20260418T073000Z/run.bat`

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
  - public markers exclude unpublished places
  - public markers exclude places with unusable coordinates
  - marker ordering is deterministic and matches `is_recommended -> recommended_rank -> name_zh -> name_en -> _id`
  - mock/Koa and CloudBase outputs stay aligned for the marker path
- The log does not report failed test files or failed tests

## Provenance

- Expectations are derived directly from task `2.1` acceptance criteria in `openspec/changes/stabilize-places-map-v1-and-admin-metadata/tasks.md`
