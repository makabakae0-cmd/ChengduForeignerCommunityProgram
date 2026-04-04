import type { ApiProvider } from "../types";

const notImplemented = async (): Promise<never> => {
  throw new Error("CloudBase provider is not implemented in Phase 1.");
};

export const createCloudbaseProvider = (): ApiProvider => ({
  auth: {
    resolveActor: notImplemented,
    login: notImplemented,
    me: notImplemented
  },
  events: {
    list: notImplemented,
    detail: notImplemented,
    createRegistration: notImplemented,
    listMyRegistrations: notImplemented,
    getTicketByRegistration: notImplemented,
    create: notImplemented,
    update: notImplemented,
    review: notImplemented,
    checkin: notImplemented
  },
  posts: {
    list: notImplemented,
    detail: notImplemented,
    create: notImplemented,
    createComment: notImplemented,
    report: notImplemented,
    moderate: notImplemented
  },
  places: {
    list: notImplemented,
    listAdmin: notImplemented,
    detail: notImplemented,
    mapMarkers: notImplemented,
    create: notImplemented,
    update: notImplemented
  },
  announcements: {
    list: notImplemented,
    detail: notImplemented
  },
  notifications: {
    list: notImplemented,
    markRead: notImplemented
  },
  files: {
    createUploadRequest: notImplemented,
    complete: notImplemented,
    privateUrl: notImplemented
  }
});
