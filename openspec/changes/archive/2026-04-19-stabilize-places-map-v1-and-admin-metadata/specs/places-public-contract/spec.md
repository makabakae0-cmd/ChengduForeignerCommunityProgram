## ADDED Requirements

### Requirement: Keep the places marker contract minimal and stable

The system SHALL treat `GET /places/map-markers` as a stable v1 map contract that stays limited to marker-safe fields instead of growing toward the place detail payload.

#### Scenario: Return a marker payload

- **WHEN** the system returns place markers for the public map
- **THEN** each marker includes only id, localized names, top-level category, recommendation flag, and coordinates
- **AND** the response does not include detail-only fields such as full address text, intro body, gallery arrays, or navigation objects

#### Scenario: Return markers in deterministic order

- **WHEN** the system returns the marker list
- **THEN** the result ordering is deterministic across provider paths
- **AND** recommendation state, `recommended_rank`, `name_zh`, `name_en`, and `_id` tiebreaking are applied in that order so marker behavior remains stable

### Requirement: Only return displayable public markers

The system SHALL expose only displayable places through the public marker endpoint.

#### Scenario: Filter out non-displayable markers

- **WHEN** a client requests public map markers
- **THEN** the system returns only places in the active community that are `published` and have usable coordinates
- **AND** unpublished places or places without valid map coordinates do not appear in the marker response
