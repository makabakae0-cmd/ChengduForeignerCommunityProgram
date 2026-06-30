# Validation Task

- change-id: `stabilize-places-map-v1-and-admin-metadata`
- run#: `0001`
- task-id: `1.1`
- ref-id: `R1`
- scope: `CLI`

## Purpose

Validate the shared v1 places marker contract freeze and top-level category taxonomy.

## How To Run

- macOS/Linux: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0001__task-1.1__ref-R1__20260418T062755Z/run.sh`
- Windows: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0001__task-1.1__ref-R1__20260418T062755Z/run.bat`

## Inputs

- Repository working tree with local dependencies already available under `node_modules/`
- Shared test files:
  - `packages/shared/test/contracts.spec.ts`
  - `packages/shared/test/client.spec.ts`
  - `packages/shared/test/places-marker-contract.spec.ts`

## Outputs

- Console Vitest output
- Log file:
  - `logs/vitest.log`

## Expected Results

- The run script exits with code `0`
- Vitest executes the targeted shared test files only
- The log confirms:
  - the shared places contract suite ran
  - the shared client suite ran
  - the shared places marker contract suite ran
- The log does not report failed test files or failed tests

## Provenance

- Expectations are derived directly from task `1.1` acceptance criteria in `openspec/changes/stabilize-places-map-v1-and-admin-metadata/tasks.md`
