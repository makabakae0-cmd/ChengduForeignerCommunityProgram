# Change: Stabilize places map v1 and admin metadata

## Why

The current `places` map flow is mostly present in code, but its v1 boundaries are still underspecified in the places change set.

In particular:

- the map page behavior is implemented, but the selected-place summary card is not yet frozen as a deliberate v1 surface
- the marker endpoint is lightweight, but the stability rules for payload shape, ordering, and displayability are not yet recorded as implementation truth
- admin place editing exists in the mock path, but CloudBase-backed admin support for map-driving place metadata is still missing
- mobile list browsing uses a fixed top-level category set while admin editing still treats categories as free text

Without a narrow stabilization change, future implementation work is likely to either bloat the marker payload, drift the map UI toward detail-fetch behavior, or let admin metadata fall out of sync with public browsing surfaces.

## What Changes

- Freeze the `places` map page v1 as a marker-driven browsing surface with marker loading, marker selection, a marker-only summary card, and map-to-detail navigation
- Keep the public marker payload minimal and stable instead of expanding it into a detail-shaped response
- Require `/places/map-markers` to return only published and displayable places for the active community
- Define deterministic marker ordering so marker behavior remains stable across provider paths
- Start real admin support for place coordinates, Tencent POI references, categories, and recommendation metadata
- Freeze the top-level places category taxonomy as shared truth across mobile, admin, and backend validation

## Relationship To Existing Changes

- This change is a stabilization follow-on to `add-places-map-browsing`
- This change covers the map and admin-metadata subset currently implied by `complete-places-frontend-and-backend-foundation`
- This change does not expand place detail, gallery flows, favorite persistence, share behavior, or dynamic taxonomy sourcing

## Impact

- Affected specs:
  - `places-map-browsing`
  - `places-public-contract`
  - `places-admin-management`
- Affected code:
  - `apps/mobile/src/pages/places/map.vue`
  - `apps/admin/src/pages/PlacesPage.vue`
  - `apps/api/src/routes/places.ts`
  - `apps/api/src/providers/**`
  - `packages/shared/src/{schemas,contracts,types,mock}/places*`
