## Context

The repository already defines canonical `place` data for public browsing and admin maintenance, but those structures are optimized for normalized backend records rather than volunteer field collection. The current `PlaceSchema`, public `places` contracts, and admin page assume operators are editing a curated record, while the project still lacks a consistent intake format for volunteer-collected place and landmark information.

The project also has domain-specific constraints that make ad hoc collection risky:

- `places` serves local residents and foreign residents, so bilingual usefulness matters even when English data is incomplete.
- Map browsing depends on stable public metadata, so raw volunteer inputs should not flow directly into public payloads.
- The project already assumes “manual maintenance + Tencent POI assistance” for places, which means volunteer collection should gather evidence and handoff context rather than try to become the final published schema.

## Goals / Non-Goals

**Goals:**

- Define a volunteer-facing collection format that can be distributed as documentation and used consistently across volunteers.
- Standardize field requiredness using clear tiers: required, conditionally required, recommended, and optional.
- Define the minimum evidence and confidence metadata needed for a submission to be reviewable.
- Define an explicit handoff boundary between volunteer-collected inputs and admin-owned canonical `place` fields.
- Keep future implementation work aligned across `docs/`, `packages/shared`, and `apps/admin`.

**Non-Goals:**

- Building a volunteer submission app, import pipeline, or OCR workflow in this change.
- Expanding public `places` list, detail, or marker payloads.
- Replacing the existing admin editor with a new workflow in this slice.
- Creating a dynamic second-level taxonomy or a full scoring model for editorial recommendation quality.

## Decisions

### 1. Treat volunteer collection as an intake card, not as the canonical `place` schema

Volunteer submissions will be modeled conceptually as an intake card with sections such as basic identification, location, usage information, confidence, and media. This intake card is upstream from the canonical `place` record and is allowed to contain incomplete, uncertain, or evidence-oriented data.

Rationale:

- Existing canonical fields such as publish status, recommendation rank, and finalized bilingual copy are not appropriate for volunteers to fill directly.
- A volunteer-facing format must accommodate uncertainty without forcing premature normalization.

Alternative considered:

- Reusing the existing admin `place` field set as the volunteer form.
- Rejected because it would push editorial and publication responsibilities onto volunteers and would produce inconsistent records.

### 2. Use requiredness tiers instead of a flat mandatory/optional split

The collection standard will classify fields as:

- required
- conditionally required
- recommended
- optional
- admin-owned / not volunteer-facing

Rationale:

- A flat mandatory/optional model is too coarse. Some fields, such as entry instructions, are not always necessary but become mandatory when navigation is ambiguous.
- The team needs a field model that is simple enough for volunteers while still preserving quality gates for operators.

Alternative considered:

- Using only mandatory and optional fields.
- Rejected because it cannot express review-critical cases like unclear entrances, uncertain business hours, or missing on-site verification.

### 3. Make location evidence mandatory, but do not require volunteers to provide raw coordinates

The intake standard will require a standard map-style address plus at least one location proof artifact, such as a map screenshot, shared location, or POI page screenshot. Entry instructions become conditionally required when a place has multiple entrances, is inside a mall or campus, or is known to be easy to mis-navigate. Raw latitude and longitude remain an admin normalization concern, not a volunteer-required field.

Rationale:

- Different map tools and coordinate systems increase the risk of bad coordinates when volunteers copy numbers casually.
- For this workflow, reviewable proof is more valuable than a raw coordinate pair with unclear provenance.

Alternative considered:

- Requiring volunteers to submit latitude and longitude for every record.
- Rejected because it adds friction, introduces coordinate-system ambiguity, and does not guarantee that the point corresponds to the real entrance or usable navigation target.

### 4. Require confidence metadata on every volunteer submission

Each collected record must include:

- source type
- collection time
- collector identity
- whether the collector visited on site
- whether the record needs review
- a review reason when review is needed

Rationale:

- The review team needs to distinguish “observed facts” from hearsay, copied map metadata, and unverified community recommendations.
- Confidence metadata is the minimum structure needed to prioritize follow-up without losing submissions.

Alternative considered:

- Relying on free-form notes to explain uncertainty.
- Rejected because it makes triage inconsistent and hard to query or standardize later.

### 5. Split collected fields into mapping buckets for admin handoff

The design will define four mapping buckets:

- direct-map: volunteer fields that can map directly into canonical `place` fields after basic validation
- admin-normalize: volunteer fields that usually need cleanup, translation, or normalization before entering the canonical record
- review-only: evidence and confidence fields that support review but do not become public place fields
- admin-owned: fields that are never volunteer-facing and remain under operator control

Rationale:

- The project needs a durable bridge between volunteer collection docs and later backend/admin implementation.
- This prevents future implementation work from confusing evidence metadata with public content fields.

Alternative considered:

- A single flat mapping table without ownership categories.
- Rejected because it hides responsibility boundaries and increases the chance of leaking volunteer-only metadata into published content.

### 6. Publish two docs deliverables under `docs/`

The implementation slice for this change should produce:

- a volunteer-distribution collection sheet
- an operator-facing mapping and review reference

Rationale:

- Volunteers need a concise document they can actually use in the field.
- Operators need a more explicit reference that explains normalization rules and admin-owned fields.

Alternative considered:

- A single combined document for both audiences.
- Rejected because the volunteer version should be short and operational, while the operator version needs more mapping detail.

## Risks / Trade-offs

- [Risk] A more structured collection sheet may increase volunteer burden. → Mitigation: keep the required set minimal and push uncertain or editorial fields into recommended or admin-owned categories.
- [Risk] English names and bilingual details may often be missing on first collection. → Mitigation: allow “pending” collection status for English-facing fields and keep them out of the hard required set.
- [Risk] Evidence quality may vary across volunteers and collection tools. → Mitigation: require at least one location proof artifact and structured confidence metadata for every submission.
- [Risk] The docs standard may diverge from current shared schemas until implementation catches up. → Mitigation: define explicit mapping buckets in the design and capture the schema/admin alignment work as later implementation tasks.

## Migration Plan

1. Publish the volunteer-distribution sheet and operator reference under `docs/`.
2. Align any future admin or shared-schema changes to the documented field tiers and mapping buckets rather than inventing a second format.
3. Treat existing ad hoc volunteer submissions as legacy inputs that must be normalized into the new structure during review.
4. Keep public `places` contracts unchanged during this transition.

## Open Questions

- Should the volunteer-facing type list use community-friendly Chinese labels only, or should it explicitly show the internal top-level taxonomy mapping as well?
- Should accessibility and language-support fields remain recommended, or should one of them become conditionally required for high-priority public-service places?
- Does the team want a spreadsheet-first distribution format, a markdown handout, or both as the first rollout artifact?
