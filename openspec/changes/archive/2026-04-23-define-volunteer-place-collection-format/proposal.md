## Why

The project currently has shared `place` schemas, public `places` contracts, and an admin editing surface, but it does not have a volunteer-facing standard for collecting place and landmark information in the field. As a result, volunteers can gather inconsistent inputs, while operators must reinterpret each submission before it can be reviewed or entered into the canonical `place` record.

The team now needs a distribution-ready collection format for volunteers. This is the right time to define the intake standard before ad hoc forms, spreadsheets, or chat messages become the de facto workflow.

## What Changes

- Define a volunteer-facing place collection standard for `places`, including section structure, field definitions, and requiredness tiers such as required, conditionally required, recommended, and optional.
- Define evidence and confidence rules for volunteer submissions, including location proof, source type, on-site visit status, review-needed flags, and review reasons.
- Define which collected fields can map directly into canonical `place` fields and which fields remain admin-owned during review and publication.
- Add volunteer-distribution documentation under `docs/` together with an operator-facing mapping reference.
- Keep existing public browsing contracts stable; this change standardizes upstream collection and review inputs rather than expanding public marker or detail payloads.

## Capabilities

### New Capabilities
- `places-volunteer-collection`: Standardize the volunteer-facing place collection checklist, field requiredness, evidence expectations, and admin handoff rules for `places` intake.

### Modified Capabilities
- `places-admin-management`: Clarify which `place` fields are sourced from volunteer intake, which remain admin-owned, and how review metadata affects publication readiness.

## Impact

- Affected docs:
  - `docs/` volunteer distribution materials
- Affected specs:
  - `places-admin-management`
  - new `places-volunteer-collection`
- Likely affected code and shared contracts in later implementation:
  - `packages/shared/src/schemas/entities.ts`
  - `packages/shared/src/schemas/places.ts`
  - `apps/admin/src/pages/PlacesPage.vue`
- Affected workflow:
  - Volunteer point collection
  - Admin review and normalization of collected place data
