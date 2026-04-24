## ADDED Requirements

### Requirement: Preserve admin ownership over publication and normalization fields
The system SHALL keep publication and editorial normalization decisions under admin control even when place records originate from volunteer collection.

#### Scenario: Review a volunteer-collected place record
- **WHEN** an administrator converts a volunteer submission into a canonical `place` record
- **THEN** publish state, recommendation rank, and finalized bilingual presentation fields remain admin-owned
- **AND** volunteer evidence or confidence metadata does not become a public `place` payload by default

### Requirement: Normalize volunteer-collected place data before publication
The system SHALL require admin review before volunteer-collected inputs are treated as publication-ready place metadata.

#### Scenario: Accept volunteer-provided place fields into admin workflow
- **WHEN** a volunteer submission includes names, address details, hours, contact information, tags, or usage notes
- **THEN** administrators can map those inputs into canonical `place` fields only after review and normalization
- **AND** uncertain, missing, or partially translated inputs do not block intake but must be resolved before publication readiness
