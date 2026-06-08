# Validation Task

- change-id: `stabilize-places-map-v1-and-admin-metadata`
- run#: `0007`
- task-id: `2.3`
- ref-id: `R5`
- scope: `CLI`

## Purpose

Validate admin places metadata parity for list, create, and update flows across the Koa server path and the CloudBase execution path.

## How To Run

- macOS/Linux: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0007__task-2.3__ref-R5__20260418T072513Z/run.sh`
- Windows: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0007__task-2.3__ref-R5__20260418T072513Z/run.bat`

## Inputs

- Repository working tree with local dependencies already available under `node_modules/`
- API test files:
  - `apps/api/test/app.spec.ts`
  - `apps/api/test/cloudbase.spec.ts`
- API TypeScript project:
  - `apps/api/tsconfig.json`

## Outputs

- Console Vitest and TypeScript output
- Log files:
  - `logs/vitest.log`
  - `logs/api-typecheck.log`

## Expected Results

- The run script exits with code `0`
- Vitest confirms:
  - admin place create persists coordinates, POI reference, category, recommendation fields, and publish state
  - admin place update persists the same fields
  - updated admin metadata becomes visible to downstream public detail and marker reads when status is `published`
  - CloudBase admin flows no longer fail for `list/create/update`
- API typecheck exits successfully

## Provenance

- Expectations are derived directly from task `2.3` acceptance criteria in `openspec/changes/stabilize-places-map-v1-and-admin-metadata/tasks.md`
