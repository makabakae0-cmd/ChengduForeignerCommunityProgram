# places-admin-management Specification

## Purpose
TBD - created by archiving change stabilize-places-map-v1-and-admin-metadata. Update Purpose after archive.
## Requirements
### Requirement: Maintain map-driving place metadata from the admin console

The system SHALL allow administrators to maintain the place metadata required by public map, list, and detail browsing surfaces.

#### Scenario: Create or edit place map metadata

- **WHEN** an authorized administrator creates or edits a place
- **THEN** the system persists bilingual names, bilingual intro, coordinates, Tencent POI reference, top-level category, second-level category, tags, recommendation state, recommendation reason, recommendation rank, and publish state through the backend
- **AND** downstream public browsing surfaces can consume those values according to public visibility rules

#### Scenario: Publish a maintained place

- **WHEN** an authorized administrator changes a maintained place to `published`
- **THEN** the place can appear in public list, recommendation, tag/category filtered list, map marker, and detail reads according to the public contracts
- **AND** draft or unpublished places remain hidden from those public surfaces

### Requirement: Use a shared top-level category taxonomy for places

The system SHALL treat top-level place categories as a controlled shared taxonomy rather than free-text admin-only metadata.

#### Scenario: Select a top-level category in admin

- **WHEN** an authorized administrator assigns `category_level_1` to a place
- **THEN** the value comes from the shared supported top-level category set
- **AND** the backend accepts supported values and rejects unsupported ones
- **AND** the mobile places browsing surfaces can use the same taxonomy as their filtering truth

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

### Requirement: Maintain place gallery media through the files flow

The system SHALL allow administrators to attach place gallery media through completed file assets rather than manually entered gallery URL text.

#### Scenario: Attach gallery media to a place

- **WHEN** an authorized administrator uploads or registers gallery media for a place
- **THEN** the system creates or uses a completed active file asset through the files flow
- **AND** the place stores gallery ownership using `gallery_file_ids`
- **AND** downstream place detail reads can resolve those file ids into displayable gallery media

#### Scenario: Save place gallery changes

- **WHEN** an authorized administrator saves gallery changes for a place
- **THEN** the admin payload persists attached file ids rather than a comma-separated gallery URL text field
- **AND** manually typed gallery URL text is not required to render the mobile place detail gallery

#### Scenario: Return attached gallery media from public detail

- **WHEN** an authorized administrator registers or attaches place gallery media and the place is published
- **THEN** `GET /places/:id` returns `gallery_media` entries with displayable URLs for the mobile detail page
- **AND** `gallery_urls` is derived from the same resolved media entries

### Requirement: Preserve admin permissions for gallery attachment

The system SHALL protect place gallery attachment behind the same admin permissions as place maintenance.

#### Scenario: Unauthorized gallery attachment

- **WHEN** a caller without the required admin role attempts to attach gallery media to a place
- **THEN** the system rejects the operation with a permission error
- **AND** the place gallery file ids and registered file assets are not partially mutated through the protected admin path

### Requirement: Edit existing admin-managed places through the backend
The system SHALL allow authorized administrators to edit existing canonical place records through the backend admin API while preserving shared validation, authorization, and public projection boundaries.

#### Scenario: Authorized admin edits an existing place
- **WHEN** a `community_admin` or `system_admin` sends `PATCH /admin/places/:id` with a valid subset of editable place fields
- **THEN** the system validates the request with the shared update schema
- **AND** persists only the defined updated fields while preserving the place `_id`, `community_id`, and omitted fields
- **AND** returns the updated canonical `Place` inside the standard success envelope
- **AND** subsequent `GET /admin/places` reads include the updated record

#### Scenario: Invalid edit is rejected without mutation
- **WHEN** an authorized administrator sends `PATCH /admin/places/:id` with invalid place field values
- **THEN** the system returns a validation error envelope
- **AND** the existing place record remains unchanged

#### Scenario: Missing place edit returns not found
- **WHEN** an authorized administrator sends `PATCH /admin/places/:id` for a place id that does not exist
- **THEN** the system returns `404 NOT_FOUND`
- **AND** no new place record is created

#### Scenario: Unauthorized edit is rejected
- **WHEN** a caller without `community_admin` or `system_admin` role sends `PATCH /admin/places/:id`
- **THEN** the system returns an authorization error envelope
- **AND** the existing place record remains unchanged

#### Scenario: Published edit updates public reads without leaking admin-only fields
- **WHEN** an authorized administrator edits a published place through `PATCH /admin/places/:id`
- **THEN** public list, map marker, and detail reads reflect the edited public fields according to their existing contracts
- **AND** public responses do not expose admin-only or detail-only fields outside their current payload boundaries

### Requirement: Delete existing admin-managed places through the backend
The system SHALL allow authorized administrators to delete existing canonical place records through the backend admin API.

#### Scenario: Authorized admin deletes an existing place
- **WHEN** a `community_admin` or `system_admin` sends `DELETE /admin/places/:id` for an existing place
- **THEN** the system removes the canonical place record from the active provider
- **AND** returns a standard success envelope containing the deleted place id
- **AND** subsequent `GET /admin/places` reads no longer include that place

#### Scenario: Deleted place is hidden from public reads
- **WHEN** an authorized administrator deletes a published place through `DELETE /admin/places/:id`
- **THEN** the place is absent from public list and map marker reads
- **AND** `GET /places/:id` for that id returns `404 NOT_FOUND`
- **AND** public payload shapes for other places remain unchanged

#### Scenario: Missing place delete returns not found
- **WHEN** an authorized administrator sends `DELETE /admin/places/:id` for a place id that does not exist
- **THEN** the system returns `404 NOT_FOUND`
- **AND** no other place records are removed or changed

#### Scenario: Unauthorized delete is rejected
- **WHEN** a caller without `community_admin` or `system_admin` role sends `DELETE /admin/places/:id`
- **THEN** the system returns an authorization error envelope
- **AND** the existing place record remains visible through admin and applicable public reads

#### Scenario: Delete contract is available through shared API definitions
- **WHEN** clients use the shared API contracts and path helpers
- **THEN** the admin delete place endpoint is exposed as `DELETE /admin/places/:id`
- **AND** the shared client can call the endpoint without defining app-local duplicate paths or DTOs

