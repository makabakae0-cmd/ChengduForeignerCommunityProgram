# places-admin-management Specification

## Purpose
TBD - created by archiving change stabilize-places-map-v1-and-admin-metadata. Update Purpose after archive.
## Requirements
### Requirement: Maintain map-driving place metadata from the admin console

The system SHALL allow administrators to maintain the place metadata required by public map, list, and detail browsing surfaces.

#### Scenario: Create or edit place map metadata

- **WHEN** an authorized administrator creates or edits a place
- **THEN** the system persists coordinates, Tencent POI reference, top-level category, second-level category, recommendation state, recommendation reason, recommendation rank, and publish state through the backend
- **AND** downstream public browsing surfaces can consume those values according to public visibility rules

### Requirement: Use a shared top-level category taxonomy for places

The system SHALL treat top-level place categories as a controlled shared taxonomy rather than free-text admin-only metadata.

#### Scenario: Select a top-level category in admin

- **WHEN** an authorized administrator assigns `category_level_1` to a place
- **THEN** the value comes from the shared supported top-level category set
- **AND** the backend accepts supported values and rejects unsupported ones
- **AND** the mobile places browsing surfaces can use the same taxonomy as their filtering truth

