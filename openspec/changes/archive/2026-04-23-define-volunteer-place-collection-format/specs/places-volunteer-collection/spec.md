## ADDED Requirements

### Requirement: Provide a volunteer-facing place collection format
The system SHALL define a volunteer-facing collection format for place and landmark intake that is separate from the canonical `place` record and is suitable for field collection, spreadsheet entry, or document-based distribution.

#### Scenario: Organize the collection sheet by sections
- **WHEN** the team prepares the volunteer collection format
- **THEN** the format groups fields into clear sections for basic identification, location, usage information, confidence, and media
- **AND** the format is concise enough to distribute to volunteers without exposing admin-only publication fields

### Requirement: Classify volunteer fields by requiredness tier
The system SHALL classify volunteer-facing fields using explicit requiredness tiers so collectors and reviewers can distinguish non-negotiable inputs from best-effort enrichment.

#### Scenario: Mark field tiers in the distributed format
- **WHEN** the volunteer collection format is published
- **THEN** each field is labeled as required, conditionally required, recommended, or optional
- **AND** admin-owned fields such as publish state and recommendation rank are excluded from the volunteer-facing format

### Requirement: Require reviewable location evidence
The system SHALL require each volunteer submission to include a reviewable location basis rather than relying on a free-form place description alone.

#### Scenario: Capture a place location for review
- **WHEN** a volunteer submits a collected place record
- **THEN** the record includes a map-style address and at least one location proof artifact such as a map screenshot, shared location, or POI reference
- **AND** entry instructions are required when the place has multiple entrances, indoor access, or known navigation ambiguity

### Requirement: Require confidence metadata on volunteer submissions
The system SHALL require every volunteer submission to include confidence metadata so the review team can judge whether the record is ready for normalization.

#### Scenario: Record collection provenance
- **WHEN** a volunteer completes a collection record
- **THEN** the record includes source type, collection time, collector identity, on-site visit status, and review-needed status
- **AND** a review reason is provided when the record is marked as needing review

### Requirement: Define the volunteer-to-admin handoff boundary
The system SHALL define which volunteer-collected fields map into canonical `place` data and which fields remain evidence or review context only.

#### Scenario: Normalize a volunteer submission into a canonical place
- **WHEN** an operator reviews a volunteer-collected place record
- **THEN** the team can distinguish direct-map fields, admin-normalize fields, review-only fields, and admin-owned fields
- **AND** the volunteer format does not require collectors to fill admin-only values such as publish state, recommendation rank, or finalized public copy
