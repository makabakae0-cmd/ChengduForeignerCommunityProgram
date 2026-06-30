# Validation Task

- change-id: `stabilize-places-map-v1-and-admin-metadata`
- run#: `0004`
- task-id: `1.2`
- ref-id: `R2`
- scope: `CLI`

## Purpose

Validate the shared marker-boundary, explicit ordering-truth, and category-validation coverage after clarifying the phase-1 rule set.

## How To Run

- macOS/Linux: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0004__task-1.2__ref-R2__20260418T070221Z/run.sh`
- Windows: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0004__task-1.2__ref-R2__20260418T070221Z/run.bat`

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
  - the explicit ordering sequence `is_recommended -> recommended_rank -> name_zh -> name_en -> _id`
  - unsupported top-level category rejection
  - the expanded supported top-level taxonomy
- The log does not report failed test files or failed tests

## Provenance

- Expectations are derived directly from task `1.2` acceptance criteria in `openspec/changes/stabilize-places-map-v1-and-admin-metadata/tasks.md`
