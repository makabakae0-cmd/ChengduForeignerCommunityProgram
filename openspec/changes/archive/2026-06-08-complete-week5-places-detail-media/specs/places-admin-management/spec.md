## ADDED Requirements

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

### Requirement: Preserve admin permissions for gallery attachment
The system SHALL protect place gallery attachment behind the same admin permissions as place maintenance.

#### Scenario: Unauthorized gallery attachment
- **WHEN** a caller without the required admin role attempts to attach gallery media to a place
- **THEN** the system rejects the operation with a permission error
- **AND** the place gallery file ids and registered file assets are not partially mutated through the protected admin path
