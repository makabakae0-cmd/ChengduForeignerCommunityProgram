export const POST_CONTENT_STATUSES = [
  "visible",
  "reported",
  "hidden",
  "deleted"
] as const;

export type PostContentStatus = (typeof POST_CONTENT_STATUSES)[number];
