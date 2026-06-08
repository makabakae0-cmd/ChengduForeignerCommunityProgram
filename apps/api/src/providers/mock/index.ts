import { createMockService } from "@community-map/shared";

import type { ApiProvider } from "../types";

export const createMockProvider = (): ApiProvider => {
  const service = createMockService();

  return {
    auth: {
      async resolveActor(userId) {
        return service.auth.me(userId).user;
      },
      async login(input) {
        return service.auth.login(input);
      },
      async me(userId) {
        return service.auth.me(userId);
      }
    },
    events: {
      async list(input) {
        return service.events.list(input);
      },
      async detail(id) {
        return service.events.detail(id);
      },
      async createRegistration(eventId, input, actorId) {
        return service.events.createRegistration(eventId, input, actorId);
      },
      async listMyRegistrations(actorId) {
        return service.events.listMyRegistrations(actorId);
      },
      async getTicketByRegistration(registrationId) {
        return service.events.getTicketByRegistration(registrationId);
      },
      async create(input, actorId) {
        return service.events.create(input, actorId);
      },
      async update(id, input) {
        return service.events.update(id, input);
      },
      async review(id, input) {
        return service.events.review(id, input);
      },
      async checkin(id, ticketId) {
        return service.events.checkin(id, ticketId);
      }
    },
    posts: {
      async list(input) {
        return service.posts.list(input);
      },
      async detail(id) {
        return service.posts.detail(id);
      },
      async create(input, actorId) {
        return service.posts.create(input, actorId);
      },
      async createComment(postId, input, actorId) {
        return service.posts.createComment(postId, input, actorId);
      },
      async report(id) {
        return service.posts.report(id);
      },
      async moderate(id, input) {
        return service.posts.moderate(id, input);
      }
    },
    places: {
      async list(input) {
        return service.places.list(input);
      },
      async listAdmin() {
        return service.places.listAdmin();
      },
      async detail(id) {
        return service.places.detail(id);
      },
      async mapMarkers() {
        return service.places.mapMarkers();
      },
      async create(input) {
        return service.places.create(input);
      },
      async update(id, input) {
        return service.places.update(id, input);
      }
    },
    announcements: {
      async list(input) {
        return service.announcements.list(input);
      },
      async detail(id) {
        return service.announcements.detail(id);
      }
    },
    notifications: {
      async list(actorId) {
        return service.notifications.list(actorId);
      },
      async markRead(id, actorId) {
        return service.notifications.markRead(id, actorId);
      }
    },
    files: {
      async createUploadRequest(input) {
        return service.files.createUploadRequest(input);
      },
      async complete(input, actorId) {
        return service.files.complete(input, actorId);
      },
      async privateUrl(input) {
        return service.files.privateUrl(input);
      }
    }
  };
};
