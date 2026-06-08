## Why

The Week 5 places milestone needs the detail page to become a real browsing surface instead of rendering placeholder strings and manually entered gallery URL text. The current flow already has a files API skeleton, but place gallery display is still not clearly backed by registered file assets.

## What Changes

- Add a media-backed `places` detail v1 experience with gallery images, business hours, address, bilingual intro, tags, and navigation action.
- Extend the public place detail payload with structured gallery media derived from registered file assets.
- Keep `GET /places` and `GET /places/map-markers` lightweight; only `GET /places/:id` receives detail media.
- Replace admin-maintained gallery URL text with file-flow attachment based on `gallery_file_ids` and completed file assets.
- Render real media on the mobile detail page as images, not as plain URL text.
- Align the mobile `places` module UI to TDesign MiniProgram conventions for the touched list, detail, map, recommended, button, feedback, loading, empty, and error states.

## Capabilities

### New Capabilities

- `places-detail-media-experience`: Covers the mobile places detail v1 experience and media rendering requirements.

### Modified Capabilities

- `places-public-contract`: Adds the structured media-backed detail payload requirement while preserving list and marker field boundaries.
- `places-admin-management`: Replaces manual gallery URL text maintenance with backend-controlled file-flow gallery attachment.

## Impact

- Affected shared code: `packages/shared/src/schemas/places.ts`, entity/types exports, contracts, mock data/service/client, and shared tests.
- Affected API code: places and files provider behavior, Koa routes, CloudBase handler parity for the shared contract shape, and API route tests.
- Affected admin code: `apps/admin` places management and files-flow client usage for gallery attachment.
- Affected mobile code: `apps/mobile/src/pages/places/**`, shared mobile status components, and TDesign MiniProgram component registration/configuration where needed.
- CloudBase live files provider implementation is intentionally out of scope for this Week 5 slice; the local/shared/API contract chain must be ready for it.
