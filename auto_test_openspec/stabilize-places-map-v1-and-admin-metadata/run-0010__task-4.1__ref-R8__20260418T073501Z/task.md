# Validation Task

- change-id: `stabilize-places-map-v1-and-admin-metadata`
- run#: `0010`
- task-id: `4.1`
- ref-id: `R8`
- scope: `CLI`

## Purpose

Validate the OpenSpec change strictly and confirm the change artifacts keep the map/admin stabilization boundaries narrow and separate from broader places detail or media work.

## How To Run

- macOS/Linux: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0010__task-4.1__ref-R8__20260418T073501Z/run.sh`
- Windows: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0010__task-4.1__ref-R8__20260418T073501Z/run.bat`

## Inputs

- OpenSpec change artifacts under:
  - `openspec/changes/stabilize-places-map-v1-and-admin-metadata/`

## Outputs

- Strict OpenSpec validation output
- Log files:
  - `logs/openspec-validate.log`

## Expected Results

- The run script exits with code `0`
- `openspec validate stabilize-places-map-v1-and-admin-metadata --strict --no-interactive` passes
- The change artifacts continue to constrain this work to:
  - marker-only summary flow on mobile map
  - fixed marker-safe public contract and ordering semantics
  - admin metadata parity for map-driving fields
  - explicit exclusion of broader detail, gallery, favorite, share, and dynamic taxonomy work

## Provenance

- Expectations are derived directly from task `4.1` acceptance criteria in `openspec/changes/stabilize-places-map-v1-and-admin-metadata/tasks.md`
