## Context

The repository already has public places list/detail/map contracts, a mobile `places` module, admin place editing, and files endpoints for upload request, completion, and private URL lookup. The gap is that place detail media is still effectively URL text: the mobile detail page renders gallery URL strings, and the admin page still accepts a comma-separated gallery URL field.

This Week 5 slice turns place detail into a real media-backed surface while staying smaller than the broader places foundation change. The slice should prepare the file-backed data path without requiring a full live CloudBase files provider in the same change.

## Goals / Non-Goals

**Goals:**

- Make `GET /places/:id` the complete source for mobile detail v1: gallery media, hours, address, bilingual intro, tags, navigation, share-ready and favorite-ready flags.
- Add structured `gallery_media` to the place detail payload, derived from registered file assets attached to the place.
- Keep `gallery_urls` only as a derived compatibility field for existing consumers and tests during the transition.
- Replace admin hand-entered gallery URL text with files-flow gallery attachment based on completed file assets and `gallery_file_ids`.
- Update the mobile `places` detail page to render images and align the full `places` module with TDesign MiniProgram conventions for touched controls and states.

**Non-Goals:**

- Do not implement a full live CloudBase files provider in this slice.
- Do not change the public list or map marker response shapes beyond preserving their existing field boundaries.
- Do not implement persisted favorites or new share backend behavior.
- Do not introduce a second Mini Program UI component library.

## Decisions

### Structured media becomes the primary detail shape

`PlaceDetail` will include `gallery_media`, an ordered array of media objects containing enough information for mobile rendering and backend traceability, such as `file_id`, `cloud_path`, `url`, and localized alt text. `gallery_urls` remains present as a derived compatibility array built from the same media objects.

Alternative considered: keep only `gallery_urls`. This is smaller, but it hides whether the media came from the files flow and makes it easier for admin/manual URL paths to creep back in.

### Detail payload resolves media server-side

Mobile will not call files endpoints to build a gallery. Providers will resolve the place's `gallery_file_ids` against registered active public file assets and produce displayable media in `GET /places/:id`.

Alternative considered: let mobile call files/private-url or another files endpoint. That would spread file-resolution rules into the frontend and make detail loading slower and less predictable.

### Admin attaches files, not URL text

The admin places form will remove the comma-separated gallery URL text field. Gallery attachment will use the existing files flow: create upload request, complete upload to create a `FileAsset`, then persist the returned `file_id` in the place's `gallery_file_ids`.

Alternative considered: keep manual URL entry as a fallback. That conflicts with the Week 5 goal that gallery rendering must use registered cloud storage/files flow rather than manually entered text.

### TDesign alignment is module-level for places

The implementation should align `apps/mobile/src/pages/places` as a module, not only `detail.vue`. For Mini Program builds, use `tdesign-miniprogram` component registration where the build chain supports it. Where H5 compatibility blocks direct MiniProgram components, use local wrappers or styles that preserve TDesign interaction semantics without adding another UI library.

Alternative considered: only restyle the detail page. That would leave list/map/recommended states inconsistent in the same user journey.

## Risks / Trade-offs

- [Risk] `gallery_media` and `gallery_urls` can drift if both are stored independently. → Build `gallery_urls` from resolved `gallery_media` and avoid accepting admin-entered gallery URL text.
- [Risk] CloudBase live places can contain `gallery_file_ids` before live file asset lookup exists. → Keep this slice contract-compatible and document that live CloudBase files provider resolution is deferred.
- [Risk] TDesign MiniProgram components may not render in H5 the same way as mp-weixin. → Prefer small wrappers or conditional configuration so H5 typecheck/build remains usable.
- [Risk] Admin upload flow may be more work than the existing simple form. → Keep the v1 attachment path narrow: upload/register gallery image, attach active public file ids, and show current attached media state.

## Migration Plan

- Add `gallery_media` while retaining derived `gallery_urls` so existing tests and consumers can be migrated incrementally.
- Update mock seed data so existing published sample places have registered file assets matching their gallery file ids.
- Remove admin gallery URL text usage from the form payload path.
- After implementation, validate shared/API/client tests, admin/mobile typechecks, and manual mobile detail rendering.
