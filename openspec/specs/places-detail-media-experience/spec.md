# places-detail-media-experience Specification

## Purpose
Define the mobile places detail media experience for backend-backed gallery rendering, navigation actions, and TDesign-aligned touched surfaces.

## Requirements
### Requirement: Show a complete media-backed place detail page

The system SHALL provide a mobile place detail page that renders decision-useful place information from the backend detail payload.

#### Scenario: Open place detail with complete public data

- **WHEN** a user opens a published place detail page
- **THEN** the page renders gallery media, business hours, address, bilingual intro, tags, and place category information from `GET /places/:id`
- **AND** the page does not depend on placeholder strings for those fields

#### Scenario: Open place detail without optional media

- **WHEN** a published place has no attached gallery media
- **THEN** the page still renders the available hours, address, intro, tags, and navigation information
- **AND** the gallery area uses a TDesign-aligned empty state instead of showing broken images or raw file identifiers

### Requirement: Render place gallery media as images

The system SHALL render place gallery media as image content on the mobile detail page.

#### Scenario: Render registered gallery URLs

- **WHEN** the detail payload includes displayable gallery media URLs
- **THEN** the mobile detail page renders those URLs through image components
- **AND** the page does not display gallery URLs, cloud paths, or file ids as plain body text

### Requirement: Provide place navigation from detail

The system SHALL provide a navigation action from the mobile place detail page when navigation data is available.

#### Scenario: Tap navigation action

- **WHEN** the user taps the detail page navigation action for a place with valid coordinates
- **THEN** the system opens the native map/location navigation flow using the place name, address, latitude, and longitude from the detail payload

### Requirement: Align the places mobile module to TDesign MiniProgram conventions

The system SHALL keep the mobile `places` module visually and behaviorally aligned with TDesign MiniProgram for Week 5 touched surfaces.

#### Scenario: View places loading, empty, and error states

- **WHEN** the user views loading, empty, or error states in the places list, detail, map, or recommended entry flow
- **THEN** the state presentation follows TDesign MiniProgram feedback conventions
- **AND** action buttons, tags, list rows, and status surfaces use TDesign components, TDesign-compatible wrappers, or TDesign-aligned styling without introducing another UI library

#### Scenario: Use places actions

- **WHEN** the user uses visible places actions such as navigation, map position, favorite placeholder, share placeholder, filter reset, or detail entry
- **THEN** the actions use consistent TDesign-aligned button and feedback behavior across the places module
