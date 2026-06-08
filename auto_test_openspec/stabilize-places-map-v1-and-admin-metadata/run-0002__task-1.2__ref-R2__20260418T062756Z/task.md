# Validation Task

- change-id: `stabilize-places-map-v1-and-admin-metadata`
- run#: `0002`
- task-id: `1.2`
- ref-id: `R2`
- scope: `CLI`

## Purpose

Validate the shared marker-boundary, ordering-truth, and category-validation test coverage added for phase 1.

## How To Run

- macOS/Linux: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0002__task-1.2__ref-R2__20260418T062756Z/run.sh`
- Windows: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0002__task-1.2__ref-R2__20260418T062756Z/run.bat`

## Inputs

- Repository working tree with local dependencies already available under `node_modules/`
- Shared test files:
  - `packages/shared/test/contracts.spec.ts`
  - `packages/shared/test/places-marker-contract.spec.ts`

## Outputs

- Console Vitest output
- Log file:
  - `logs/vitest.log`

## Expected Results

- The run script exits with code `0`
- Vitest executes the marker-focused shared test files
- The log confirms coverage of:
  - marker-safe field boundaries
  - deterministic marker ordering
  - unsupported top-level category rejection
- The log does not report failed test files or failed tests

## Provenance

- Expectations are derived directly from task `1.2` acceptance criteria in `openspec/changes/stabilize-places-map-v1-and-admin-metadata/tasks.md`
