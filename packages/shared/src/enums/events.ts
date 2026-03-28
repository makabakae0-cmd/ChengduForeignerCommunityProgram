export const EVENT_REVIEW_STATUSES = [
  "draft",
  "pending_review",
  "approved",
  "rejected"
] as const;
export const EVENT_PUBLISH_STATUSES = [
  "draft",
  "published",
  "offline",
  "ended"
] as const;
export const EVENT_REGISTRATION_STATUSES = [
  "submitted",
  "confirmed",
  "cancelled",
  "closed"
] as const;
export const EVENT_TICKET_STATUSES = ["valid", "used", "invalid"] as const;

export type EventReviewStatus = (typeof EVENT_REVIEW_STATUSES)[number];
export type EventPublishStatus = (typeof EVENT_PUBLISH_STATUSES)[number];
export type EventRegistrationStatus =
  (typeof EVENT_REGISTRATION_STATUSES)[number];
export type EventTicketStatus = (typeof EVENT_TICKET_STATUSES)[number];
