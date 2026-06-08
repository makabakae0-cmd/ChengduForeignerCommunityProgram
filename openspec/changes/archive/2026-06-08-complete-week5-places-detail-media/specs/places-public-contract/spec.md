## ADDED Requirements

### Requirement: Public place detail SHALL include structured media-backed gallery data
The system SHALL expose place detail gallery media as structured media data derived from registered file assets.

#### Scenario: Return place detail with gallery media
- **WHEN** a client requests `GET /places/:id` for a published place with active public gallery file assets
- **THEN** the detail payload includes `gallery_media` entries with displayable image URLs and file traceability fields
- **AND** `gallery_urls`, when present, is derived from the same resolved gallery media instead of separately stored manual URL text

#### Scenario: Return place detail with no gallery media
- **WHEN** a client requests `GET /places/:id` for a published place without active public gallery file assets
- **THEN** the detail payload returns empty gallery media data
- **AND** the response remains valid for the mobile detail page

### Requirement: Public place detail SHALL remain the only public places payload with detail media
The system SHALL keep public places list and map marker payloads separate from place detail media.

#### Scenario: Request list and marker payloads
- **WHEN** a client requests `GET /places` or `GET /places/map-markers`
- **THEN** the response does not include `gallery_media`, `gallery_urls`, complete intro bodies, full address bodies, or navigation objects
- **AND** media-backed gallery data is only returned from `GET /places/:id`

### Requirement: Public place detail SHALL enforce published visibility
The system SHALL only expose media-backed place details for published places in the active community.

#### Scenario: Request an unpublished place detail
- **WHEN** a client requests `GET /places/:id` for a draft or otherwise unpublished place
- **THEN** the system rejects the request as not found
- **AND** the response does not expose gallery media or other detail-only fields
