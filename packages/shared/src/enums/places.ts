export const PLACE_STATUSES = ["draft", "published", "offline"] as const;

export type PlaceStatus = (typeof PLACE_STATUSES)[number];
