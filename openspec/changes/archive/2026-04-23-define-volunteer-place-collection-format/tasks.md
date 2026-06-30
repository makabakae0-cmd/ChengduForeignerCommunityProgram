## 1. Volunteer Collection Docs

- [x] 1.1 Draft the volunteer-facing collection sheet under `docs/志愿者点位采集表-v1.md` [#R1]
  - ACCEPT: The volunteer sheet defines the field sections for basic identification, location, usage information, confidence, and media, and clearly marks each volunteer-facing field as required, conditionally required, recommended, or optional.
  - TEST: SCOPE: CLI
    - When done, generate validation bundle under:
      `auto_test_openspec/define-volunteer-place-collection-format/<run-folder>/`
    - run-folder MUST be:
      `run-<RUN4>__task-1.1__ref-R1__<YYYYMMDDThhmmssZ>/`
    - Run: `auto_test_openspec/define-volunteer-place-collection-format/<run-folder>/run.sh` or `run.bat`
    - Verify: CLI checks confirm the volunteer sheet exists and includes the required section headings plus explicit field-tier labeling

- [x] 1.2 Add volunteer guidance for location proof, ambiguous entrances, and enrichment fields [#R2]
  - ACCEPT: The volunteer sheet explains that standard map-style address and at least one location proof artifact are mandatory, makes entry instructions conditionally required for hard-to-find places, and documents how to treat fields such as English names, fees, language support, accessibility, and tags.
  - TEST: SCOPE: CLI
    - When done, generate validation bundle under:
      `auto_test_openspec/define-volunteer-place-collection-format/<run-folder>/`
    - run-folder MUST be:
      `run-<RUN4>__task-1.2__ref-R2__<YYYYMMDDThhmmssZ>/`
    - Run: `auto_test_openspec/define-volunteer-place-collection-format/<run-folder>/run.sh` or `run.bat`
    - Verify: CLI checks confirm the published doc contains rules for location proof, conditional entry notes, and the handling guidance for the enrichment field set

## 2. Admin Handoff And Review Rules

- [x] 2.1 Draft the operator mapping reference under `docs/点位采集审核与映射说明-v1.md` [#R3]
  - ACCEPT: The operator reference defines the mapping buckets `direct-map`, `admin-normalize`, `review-only`, and `admin-owned`, and shows how volunteer-collected fields map into canonical `place` data or remain review context only.
  - TEST: SCOPE: CLI
    - When done, generate validation bundle under:
      `auto_test_openspec/define-volunteer-place-collection-format/<run-folder>/`
    - run-folder MUST be:
      `run-<RUN4>__task-2.1__ref-R3__<YYYYMMDDThhmmssZ>/`
    - Run: `auto_test_openspec/define-volunteer-place-collection-format/<run-folder>/run.sh` or `run.bat`
    - Verify: CLI checks confirm the operator reference exists and includes the four mapping buckets together with representative field mappings

- [x] 2.2 Document review and publication-readiness rules for volunteer-collected place records [#R4]
  - ACCEPT: The operator reference states that publish state, recommendation rank, and finalized bilingual public copy remain admin-owned, and explains how missing English fields, uncertain business hours, unverified claims, and review-needed submissions are handled before publication readiness.
  - TEST: SCOPE: CLI
    - When done, generate validation bundle under:
      `auto_test_openspec/define-volunteer-place-collection-format/<run-folder>/`
    - run-folder MUST be:
      `run-<RUN4>__task-2.2__ref-R4__<YYYYMMDDThhmmssZ>/`
    - Run: `auto_test_openspec/define-volunteer-place-collection-format/<run-folder>/run.sh` or `run.bat`
    - Verify: CLI checks confirm the operator reference contains explicit admin-owned-field rules and publication-readiness guidance for incomplete or uncertain volunteer inputs

## 3. Terminology And Taxonomy Alignment

- [x] 3.1 Align the volunteer-facing type list with the current shared places taxonomy [#R5]
  - ACCEPT: The docs use a volunteer-friendly type list that is explicitly aligned with the existing top-level `places` taxonomy so future admin normalization does not require inventing a second category set.
  - TEST: SCOPE: CLI
    - When done, generate validation bundle under:
      `auto_test_openspec/define-volunteer-place-collection-format/<run-folder>/`
    - run-folder MUST be:
      `run-<RUN4>__task-3.1__ref-R5__<YYYYMMDDThhmmssZ>/`
    - Run: `auto_test_openspec/define-volunteer-place-collection-format/<run-folder>/run.sh` or `run.bat`
    - Verify: CLI checks compare the volunteer-doc type list with the current shared top-level category source and confirm there is no conflicting taxonomy guidance

- [x] 3.2 Align volunteer field wording with current admin and shared-place terminology [#R6]
  - ACCEPT: The docs use field wording that maps cleanly to existing `place` concepts such as names, addresses, location, POI reference, hours, tags, and recommendation-related metadata, while still keeping admin-only fields out of the volunteer sheet.
  - TEST: SCOPE: CLI
    - When done, generate validation bundle under:
      `auto_test_openspec/define-volunteer-place-collection-format/<run-folder>/`
    - run-folder MUST be:
      `run-<RUN4>__task-3.2__ref-R6__<YYYYMMDDThhmmssZ>/`
    - Run: `auto_test_openspec/define-volunteer-place-collection-format/<run-folder>/run.sh` or `run.bat`
    - Verify: CLI checks confirm the docs reference existing `place` terminology consistently and keep admin-only fields out of the volunteer-facing checklist

## 4. Spec Hygiene

- [x] 4.1 Validate the OpenSpec change and confirm it is ready for implementation [#R7]
  - ACCEPT: The change includes `proposal.md`, `design.md`, `tasks.md`, the new `places-volunteer-collection` spec, and the `places-admin-management` delta spec, and `openspec validate define-volunteer-place-collection-format --strict --no-interactive` passes.
  - TEST: SCOPE: CLI
    - When done, generate validation bundle under:
      `auto_test_openspec/define-volunteer-place-collection-format/<run-folder>/`
    - run-folder MUST be:
      `run-<RUN4>__task-4.1__ref-R7__<YYYYMMDDThhmmssZ>/`
    - Run: `auto_test_openspec/define-volunteer-place-collection-format/<run-folder>/run.sh` or `run.bat`
    - Verify: strict OpenSpec validation succeeds and the artifact set is complete for apply-ready implementation
