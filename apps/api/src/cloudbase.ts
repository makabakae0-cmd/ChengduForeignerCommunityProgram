import {
  AnnouncementListQuerySchema,
  CheckinInputSchema,
  CompleteUploadInputSchema,
  CreateCommentInputSchema,
  CreateEventInputSchema,
  CreateEventRegistrationInputSchema,
  CreatePlaceInputSchema,
  CreatePostInputSchema,
  CreateUploadRequestInputSchema,
  EventListQuerySchema,
  LoginRequestSchema,
  PlaceListQuerySchema,
  PostListQuerySchema,
  PrivateUrlRequestInputSchema,
  ReviewEventInputSchema,
  UpdateEventInputSchema,
  UpdatePlaceInputSchema
} from "@community-map/shared";

import { apiError, ApiAppError } from "./lib/errors";
import { parseOrThrow } from "./lib/http";
import { createProvider } from "./providers";

type HttpMethod = "GET" | "POST" | "PATCH";
type CloudbaseEventHandler = (
  event: unknown,
  context: CloudbaseContextLike
) => Promise<IntegrationResponse>;

interface IntegrationResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: unknown;
}

interface CloudbaseContextLike {
  eventID: string;
  httpContext: {
    url: string;
    httpMethod: string;
    headers?: Record<string, string | string[] | undefined>;
  };
}

interface RouteMatch {
  matched: boolean;
  params: Record<string, string>;
}

const provider = createProvider(process.env.API_PROVIDER);

const matchRoute = (pattern: string, pathname: string): RouteMatch => {
  const patternSegments = pattern.split("/").filter(Boolean);
  const pathSegments = pathname.split("/").filter(Boolean);

  if (patternSegments.length !== pathSegments.length) {
    return { matched: false, params: {} };
  }

  const params: Record<string, string> = {};
  for (let index = 0; index < patternSegments.length; index += 1) {
    const patternSegment = patternSegments[index];
    const pathSegment = pathSegments[index];
    if (patternSegment.startsWith(":")) {
      params[patternSegment.slice(1)] = pathSegment;
      continue;
    }
    if (patternSegment !== pathSegment) {
      return { matched: false, params: {} };
    }
  }

  return { matched: true, params };
};

const getActorId = (context: CloudbaseContextLike) => {
  const headerValue = context.httpContext.headers?.["x-mock-user-id"];
  if (Array.isArray(headerValue)) {
    return headerValue[0];
  }
  return headerValue;
};

const ok = (body: unknown, requestId: string, statusCode = 200): IntegrationResponse => ({
  statusCode,
  headers: {
    "content-type": "application/json"
  },
  body: {
    success: true,
    data: body,
    requestId
  }
});

const fail = (error: ApiAppError, requestId: string): IntegrationResponse => ({
  statusCode: error.status,
  headers: {
    "content-type": "application/json"
  },
  body: {
    success: false,
    error: {
      code: error.code,
      message: error.message,
      details: error.details
    },
    requestId
  }
});

const requireRole = async (
  context: CloudbaseContextLike,
  roles: Array<"community_admin" | "system_admin">
) => {
  const actor = await provider.auth.resolveActor(getActorId(context));
  if (!roles.some((role) => actor.role_flags.includes(role))) {
    throw apiError("FORBIDDEN", "Insufficient permission.", 403);
  }
  return actor;
};

export const main: CloudbaseEventHandler = async (event, context) => {
  const requestId = context.eventID;
  const httpContext = context.httpContext as CloudbaseContextLike["httpContext"];
  const url = new URL(httpContext.url, "http://localhost");
  const pathname = url.pathname;
  const method = httpContext.httpMethod.toUpperCase() as HttpMethod;
  const actorId = getActorId({
    eventID: requestId,
    httpContext
  });

  try {
    if (method === "GET" && pathname === "/health") {
      return ok({ ok: true }, requestId);
    }

    if (method === "POST" && pathname === "/auth/login") {
      const input = parseOrThrow(LoginRequestSchema, event);
      return ok(await provider.auth.login(input), requestId);
    }

    if (method === "GET" && pathname === "/auth/me") {
      return ok(await provider.auth.me(actorId), requestId);
    }

    if (method === "GET" && pathname === "/events") {
      const query = parseOrThrow(
        EventListQuerySchema,
        Object.fromEntries(url.searchParams.entries())
      );
      return ok(await provider.events.list(query), requestId);
    }

    {
      const match = matchRoute("/events/:id", pathname);
      if (method === "GET" && match.matched) {
        const eventItem = await provider.events.detail(match.params.id);
        if (!eventItem) {
          throw apiError("NOT_FOUND", "Event not found.", 404);
        }
        return ok(eventItem, requestId);
      }
    }

    {
      const match = matchRoute("/events/:id/registrations", pathname);
      if (method === "POST" && match.matched) {
        const input = parseOrThrow(CreateEventRegistrationInputSchema, event);
        return ok(
          await provider.events.createRegistration(match.params.id, input, actorId),
          requestId,
          201
        );
      }
    }

    if (method === "GET" && pathname === "/events/me/registrations") {
      return ok(await provider.events.listMyRegistrations(actorId), requestId);
    }

    {
      const match = matchRoute("/events/registrations/:id/ticket", pathname);
      if (method === "GET" && match.matched) {
        const ticket = await provider.events.getTicketByRegistration(match.params.id);
        if (!ticket) {
          throw apiError("NOT_FOUND", "Ticket not found.", 404);
        }
        return ok(ticket, requestId);
      }
    }

    if (method === "GET" && pathname === "/discover/posts") {
      const query = parseOrThrow(
        PostListQuerySchema,
        Object.fromEntries(url.searchParams.entries())
      );
      return ok(await provider.posts.list(query), requestId);
    }

    {
      const match = matchRoute("/discover/posts/:id", pathname);
      if (method === "GET" && match.matched) {
        const post = await provider.posts.detail(match.params.id);
        if (!post) {
          throw apiError("NOT_FOUND", "Post not found.", 404);
        }
        return ok(post, requestId);
      }
    }

    if (method === "POST" && pathname === "/discover/posts") {
      const input = parseOrThrow(CreatePostInputSchema, event);
      return ok(await provider.posts.create(input, actorId), requestId, 201);
    }

    {
      const commentMatch = matchRoute("/discover/posts/:id/comments", pathname);
      if (method === "POST" && commentMatch.matched) {
        const input = parseOrThrow(CreateCommentInputSchema, event);
        return ok(
          await provider.posts.createComment(commentMatch.params.id, input, actorId),
          requestId,
          201
        );
      }
    }

    if (method === "GET" && pathname === "/places") {
      const query = parseOrThrow(
        PlaceListQuerySchema,
        Object.fromEntries(url.searchParams.entries())
      );
      return ok(await provider.places.list(query), requestId);
    }

    if (method === "GET" && pathname === "/places/map-markers") {
      return ok(await provider.places.mapMarkers(), requestId);
    }

    {
      const match = matchRoute("/places/:id", pathname);
      if (method === "GET" && match.matched) {
        const place = await provider.places.detail(match.params.id);
        if (!place) {
          throw apiError("NOT_FOUND", "Place not found.", 404);
        }
        return ok(place, requestId);
      }
    }

    if (method === "GET" && pathname === "/announcements") {
      const query = parseOrThrow(
        AnnouncementListQuerySchema,
        Object.fromEntries(url.searchParams.entries())
      );
      return ok(await provider.announcements.list(query), requestId);
    }

    {
      const match = matchRoute("/announcements/:id", pathname);
      if (method === "GET" && match.matched) {
        const announcement = await provider.announcements.detail(match.params.id);
        if (!announcement) {
          throw apiError("NOT_FOUND", "Announcement not found.", 404);
        }
        return ok(announcement, requestId);
      }
    }

    if (method === "GET" && pathname === "/notifications") {
      return ok(await provider.notifications.list(actorId), requestId);
    }

    {
      const match = matchRoute("/notifications/:id/read", pathname);
      if (method === "POST" && match.matched) {
        const item = await provider.notifications.markRead(match.params.id, actorId);
        if (!item) {
          throw apiError("NOT_FOUND", "Notification not found.", 404);
        }
        return ok(item, requestId);
      }
    }

    if (method === "POST" && pathname === "/files/upload-requests") {
      const input = parseOrThrow(CreateUploadRequestInputSchema, event);
      return ok(await provider.files.createUploadRequest(input), requestId, 201);
    }

    if (method === "POST" && pathname === "/files/complete") {
      const input = parseOrThrow(CompleteUploadInputSchema, event);
      return ok(await provider.files.complete(input, actorId), requestId, 201);
    }

    if (method === "POST" && pathname === "/files/private-url") {
      const input = parseOrThrow(PrivateUrlRequestInputSchema, event);
      return ok(await provider.files.privateUrl(input), requestId);
    }

    if (method === "POST" && pathname === "/admin/events") {
      const actor = await requireRole({ eventID: requestId, httpContext }, [
        "community_admin",
        "system_admin"
      ]);
      const input = parseOrThrow(CreateEventInputSchema, event);
      return ok(await provider.events.create(input, actor._id), requestId, 201);
    }

    {
      const match = matchRoute("/admin/events/:id", pathname);
      if (method === "PATCH" && match.matched) {
        await requireRole({ eventID: requestId, httpContext }, [
          "community_admin",
          "system_admin"
        ]);
        const input = parseOrThrow(UpdateEventInputSchema, event);
        const item = await provider.events.update(match.params.id, input);
        if (!item) {
          throw apiError("NOT_FOUND", "Event not found.", 404);
        }
        return ok(item, requestId);
      }
    }

    {
      const match = matchRoute("/admin/events/:id/review", pathname);
      if (method === "POST" && match.matched) {
        await requireRole({ eventID: requestId, httpContext }, [
          "community_admin",
          "system_admin"
        ]);
        const input = parseOrThrow(ReviewEventInputSchema, event);
        const item = await provider.events.review(match.params.id, input);
        if (!item) {
          throw apiError("NOT_FOUND", "Event not found.", 404);
        }
        return ok(item, requestId);
      }
    }

    {
      const match = matchRoute("/admin/events/:id/checkin", pathname);
      if (method === "POST" && match.matched) {
        await requireRole({ eventID: requestId, httpContext }, [
          "community_admin",
          "system_admin"
        ]);
        const input = parseOrThrow(CheckinInputSchema, event);
        const ticket = await provider.events.checkin(match.params.id, input.ticket_id);
        if (!ticket) {
          throw apiError("NOT_FOUND", "Ticket not found.", 404);
        }
        return ok(ticket, requestId);
      }
    }

    if (method === "POST" && pathname === "/admin/places") {
      await requireRole({ eventID: requestId, httpContext }, [
        "community_admin",
        "system_admin"
      ]);
      const input = parseOrThrow(CreatePlaceInputSchema, event);
      return ok(await provider.places.create(input), requestId, 201);
    }

    {
      const match = matchRoute("/admin/places/:id", pathname);
      if (method === "PATCH" && match.matched) {
        await requireRole({ eventID: requestId, httpContext }, [
          "community_admin",
          "system_admin"
        ]);
        const input = parseOrThrow(UpdatePlaceInputSchema, event);
        const item = await provider.places.update(match.params.id, input);
        if (!item) {
          throw apiError("NOT_FOUND", "Place not found.", 404);
        }
        return ok(item, requestId);
      }
    }

    throw apiError("NOT_FOUND", `No handler for ${method} ${pathname}`, 404);
  } catch (error) {
    if (error instanceof ApiAppError) {
      return fail(error, requestId);
    }

    return fail(
      apiError("INTERNAL_ERROR", "Unexpected server error.", 500),
      requestId
    );
  }
};
