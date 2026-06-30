# Design: Stabilize places map v1 and admin metadata

## Scope

This change defines the map-page stabilization rules for `places` v1 and the minimum real admin metadata support needed to feed the public map, list, and detail surfaces.

This change does not redefine the full detail page, gallery upload flow, favorite persistence, share implementation, or a dynamic category-management system.

## Design Decisions

### 1. Keep the map page marker-driven

The map page remains a browsing surface, not a second detail page.

When a user taps a marker, the page should:

- select and highlight that place in page state
- render a marker-only summary card
- expose a primary CTA into the place detail page

The summary card should only depend on marker-safe data:

- localized place name
- top-level category
- recommendation state
- detail CTA

The card should not fetch place detail on marker tap, and the marker payload should not grow just to make the card richer.

### 2. Freeze marker payload and ordering semantics

`GET /places/map-markers` remains the map-safe contract for v1.

Each marker stays limited to:

- place id
- localized names
- top-level category
- recommendation flag
- coordinates

To keep map behavior stable across provider paths, the marker result must be returned in deterministic order. The ordering truth for v1 is:

1. recommended places first
2. lower `recommended_rank` first
3. `name_zh` ascending
4. `name_en` ascending
5. `_id` ascending as the final tiebreaker

This keeps map rendering and marker-id mapping reproducible without requiring a heavier payload.

### 3. Define displayable marker visibility rules

The public marker endpoint should only emit places that are safe and useful to place on a public map.

For v1, a place is displayable on the public map only when it is:

- in the active community
- `published`
- equipped with usable coordinates

Unpublished places, draft records, or records without valid coordinates must not appear in the marker response.

### 4. Make admin metadata support real where the map depends on it

The admin surface already exposes map-driving fields in the mock path. This change makes those fields part of the real backend support baseline.

Minimum real support includes:

- list admin places
- create a place with coordinates and category metadata
- update a place with coordinates, `tencent_map_poi_id`, recommendation fields, and publish state

Mock, Koa, and CloudBase execution paths must agree on the field set and visibility consequences of those edits.

### 5. Freeze top-level category taxonomy for v1

The current mobile experience already assumes a controlled top-level category set. This change makes that assumption explicit and shared.

For v1:

- `category_level_1` uses a controlled shared taxonomy
- the supported top-level values are `public-service`, `food-drink`, `shopping`, `lifestyle`, `education`, `health-wellness`, `entertainment`, `outdoor-sports`, `transport`, and `community`
- admin editing should select from that shared set instead of free-text entry
- backend validation should reject unsupported top-level category values
- `category_level_2` may remain a required string field and does not need dynamic taxonomy management in this slice

## Risks And Guardrails

- Do not expand map markers into detail-shaped DTOs to satisfy card design pressure.
- Do not introduce detail fetches on marker tap for this v1 stabilization slice.
- Do not let admin category handling diverge from mobile category filters.
- Do not treat mock-only admin support as sufficient once CloudBase-backed admin metadata is part of scope.

## Stabilization Boundaries

This change intentionally stops at a narrow map-and-admin stabilization line.

- The mobile map page remains a marker-only summary flow. Its selected-place card may show only marker-safe fields and a detail CTA.
- The map page must route into place detail using the selected marker id already held in page state. Marker taps do not trigger detail fetches.
- Public marker payload shape, ordering semantics, and publish/displayability rules remain fixed for v1 and are not re-opened by UI work.
- Admin scope in this change is limited to metadata parity and validation alignment for map-driving fields. It does not redesign place detail, media, share, favorite, or dynamic taxonomy management.
