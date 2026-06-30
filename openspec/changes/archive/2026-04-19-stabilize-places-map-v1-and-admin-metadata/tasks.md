## 1. Shared Contract And Taxonomy

- [x] 1.1 Freeze the v1 places marker contract and top-level category taxonomy in shared types [#R1]
  - ACCEPT: `packages/shared` keeps the marker payload limited to marker-safe fields only, records deterministic ordering expectations for marker consumers, and defines a shared top-level places category set used by public and admin surfaces.
  - TEST: SCOPE: CLI
    - When done, generate validation bundle under:
      `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/<run-folder>/`
    - run-folder MUST be:
      `run-<RUN4>__task-1.1__ref-R1__<YYYYMMDDThhmmssZ>/`
    - Run: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/<run-folder>/run.sh` or `run.bat`
    - Verify: shared schema/contract checks confirm marker field boundaries, the explicit ordering sequence `is_recommended -> recommended_rank -> name_zh -> name_en -> _id`, and shared category definitions
  - BUNDLE (RUN #1): Shared marker contract freeze and category taxonomy validation bundle ready | VALIDATION_BUNDLE: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0001__task-1.1__ref-R1__20260418T062755Z` | HOW_TO_RUN: `run.sh` / `run.bat`
  - BUNDLE (RUN #3): Shared marker contract freeze and explicit ordering semantics validation bundle ready | VALIDATION_BUNDLE: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0003__task-1.1__ref-R1__20260418T070220Z` | HOW_TO_RUN: `run.sh` / `run.bat`

- [x] 1.2 Add or update shared tests for marker payload boundaries, ordering truth, and category validation [#R2]
  - ACCEPT: shared tests assert that map markers do not expose detail-only fields, keep stable ordering semantics, and reject unsupported top-level category values where validation applies.
  - TEST: SCOPE: CLI
    - When done, generate validation bundle under:
      `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/<run-folder>/`
    - run-folder MUST be:
      `run-<RUN4>__task-1.2__ref-R2__<YYYYMMDDThhmmssZ>/`
    - Run: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/<run-folder>/run.sh` or `run.bat`
    - Verify: shared Vitest coverage includes positive and negative assertions for marker shape, the explicit ordering sequence `is_recommended -> recommended_rank -> name_zh -> name_en -> _id`, and category validation
  - BUNDLE (RUN #2): Shared marker boundary, ordering, and category validation bundle ready | VALIDATION_BUNDLE: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0002__task-1.2__ref-R2__20260418T062756Z` | HOW_TO_RUN: `run.sh` / `run.bat`
  - BUNDLE (RUN #4): Shared marker boundary, explicit ordering, and category validation bundle ready | VALIDATION_BUNDLE: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0004__task-1.2__ref-R2__20260418T070221Z` | HOW_TO_RUN: `run.sh` / `run.bat`

## 2. Public Map And Backend Semantics

- [x] 2.1 Enforce displayable public marker visibility and deterministic ordering across provider paths [#R3]
  - ACCEPT: `/places/map-markers` returns only published, displayable places for the active community and does so in the same deterministic order across mock, Koa, CloudBase handler, and CloudBase provider execution paths.
  - TEST: SCOPE: CLI
    - When done, generate validation bundle under:
      `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/<run-folder>/`
    - run-folder MUST be:
      `run-<RUN4>__task-2.1__ref-R3__<YYYYMMDDThhmmssZ>/`
    - Run: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/<run-folder>/run.sh` or `run.bat`
    - Verify: route and parity tests cover unpublished exclusion, coordinate/displayability rules, and stable marker ordering
  - BUNDLE (RUN #5): Public marker visibility and deterministic ordering validation bundle ready | VALIDATION_BUNDLE: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0005__task-2.1__ref-R3__20260418T073000Z` | HOW_TO_RUN: `run.sh` / `run.bat`

- [x] 2.2 Keep the public marker response separate from detail payloads [#R4]
  - ACCEPT: public map markers remain lightweight and do not inherit address body, intro, gallery, navigation object, or other detail-only structures.
  - TEST: SCOPE: CLI
    - When done, generate validation bundle under:
      `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/<run-folder>/`
    - run-folder MUST be:
      `run-<RUN4>__task-2.2__ref-R4__<YYYYMMDDThhmmssZ>/`
    - Run: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/<run-folder>/run.sh` or `run.bat`
    - Verify: contract and route assertions confirm marker responses stay distinct from place detail
  - BUNDLE (RUN #6): Public marker payload boundary validation bundle ready | VALIDATION_BUNDLE: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0006__task-2.2__ref-R4__20260418T073001Z` | HOW_TO_RUN: `run.sh` / `run.bat`

- [x] 2.3 Implement real admin places metadata parity for list, create, and update flows [#R5]
  - ACCEPT: admin place reads and writes work across supported provider paths for coordinates, Tencent POI reference, top-level category, second-level category, recommendation state, recommendation reason, recommendation rank, and publish state.
  - TEST: SCOPE: CLI
    - When done, generate validation bundle under:
      `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/<run-folder>/`
    - run-folder MUST be:
      `run-<RUN4>__task-2.3__ref-R5__<YYYYMMDDThhmmssZ>/`
    - Run: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/<run-folder>/run.sh` or `run.bat`
    - Verify: admin API tests confirm metadata persistence and downstream public visibility behavior after publish/unpublish changes
  - BUNDLE (RUN #7): Admin places metadata parity validation bundle ready | VALIDATION_BUNDLE: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0007__task-2.3__ref-R5__20260418T072513Z` | HOW_TO_RUN: `run.sh` / `run.bat`

## 3. Mobile Map And Admin Surface Behavior

- [x] 3.1 Freeze the mobile places map page as a marker-only summary flow [#R6]
  - ACCEPT: `apps/mobile/src/pages/places/map.vue` loads markers, supports marker selection, shows a summary card based only on marker-safe fields, and routes the user into place detail without performing marker-triggered detail fetches.
  - TEST: SCOPE: MIXED
    - When done, generate validation bundle under:
      `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/<run-folder>/`
    - run-folder MUST be:
      `run-<RUN4>__task-3.1__ref-R6__<YYYYMMDDThhmmssZ>/`
    - Run: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/<run-folder>/run.sh` or `run.bat`
    - Verify: MCP GUI runbook confirms marker load, selection change, marker-only summary card content, and map-to-detail navigation
  - BUNDLE (RUN #9): Mobile places map marker-only summary validation bundle ready | VALIDATION_BUNDLE: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0009__task-3.1__ref-R6__20260418T073500Z` | HOW_TO_RUN: `run.sh` / `run.bat`

- [x] 3.2 Align the admin places editor with shared category and metadata rules [#R7]
  - ACCEPT: `apps/admin/src/pages/PlacesPage.vue` treats top-level category as a controlled shared choice and exposes editable coordinates, Tencent POI reference, category, and recommendation fields in a way that matches backend validation.
  - TEST: SCOPE: MIXED
    - When done, generate validation bundle under:
      `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/<run-folder>/`
    - run-folder MUST be:
      `run-<RUN4>__task-3.2__ref-R7__<YYYYMMDDThhmmssZ>/`
    - Run: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/<run-folder>/run.sh` or `run.bat`
    - Verify: MCP GUI runbook confirms admin edits for category and map metadata can be saved and later reflected in public browsing behavior
  - BUNDLE (RUN #8): Admin places editor taxonomy and validation alignment bundle ready | VALIDATION_BUNDLE: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0008__task-3.2__ref-R7__20260418T072514Z` | HOW_TO_RUN: `run.sh` / `run.bat`

## 4. Spec Hygiene And Validation

- [x] 4.1 Validate the OpenSpec change and record the map/admin stabilization boundaries [#R8]
  - ACCEPT: the change includes `proposal.md`, `design.md`, `tasks.md`, and the affected spec delta files, and `openspec validate stabilize-places-map-v1-and-admin-metadata --strict --no-interactive` passes.
  - TEST: SCOPE: CLI
    - When done, generate validation bundle under:
      `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/<run-folder>/`
    - run-folder MUST be:
      `run-<RUN4>__task-4.1__ref-R8__<YYYYMMDDThhmmssZ>/`
    - Run: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/<run-folder>/run.sh` or `run.bat`
    - Verify: strict OpenSpec validation succeeds and the change docs keep map stabilization separate from broader places detail or media work
  - BUNDLE (RUN #10): Strict OpenSpec validation and stabilization-boundary recording bundle ready | VALIDATION_BUNDLE: `auto_test_openspec/stabilize-places-map-v1-and-admin-metadata/run-0010__task-4.1__ref-R8__20260418T073501Z` | HOW_TO_RUN: `run.sh` / `run.bat`
