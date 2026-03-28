import type {
  Announcement,
  AuthSession,
  Comment,
  Event,
  EventRegistration,
  EventTicket,
  FileAsset,
  Notification,
  Place,
  Post,
  User
} from "../types/entities";
import type { MockDataset } from "./data";
import { FILE_PATH_RULES } from "../schemas/files";

import { createMockDataset } from "./data";

interface PageParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
}

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

const paginate = <TItem>(
  items: TItem[],
  params: PageParams = {}
): { items: TItem[]; page: number; pageSize: number; total: number } => {
  const page = params.page ?? DEFAULT_PAGE;
  const pageSize = params.pageSize ?? DEFAULT_PAGE_SIZE;
  const start = (page - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    page,
    pageSize,
    total: items.length
  };
};

const keywordMatch = (value: string | null | undefined, keyword?: string) => {
  if (!keyword) {
    return true;
  }

  return (value ?? "").toLowerCase().includes(keyword.toLowerCase());
};

const idFrom = (prefix: string) =>
  `${prefix}_${Math.random().toString(36).slice(2, 8)}`;

export const createMockService = (seed?: Partial<MockDataset>) => {
  const state: MockDataset = {
    ...createMockDataset(),
    ...seed
  };

  const findUser = (userId?: string) =>
    state.users.find((user) => user._id === userId) ?? state.users[0];

  const createSession = (user: User): AuthSession => ({
    user,
    token: `mock-token-${user._id}`
  });

  return {
    auth: {
      login(input: { mock_user_id?: string; preferred_language?: "zh" | "en" }) {
        const user = findUser(input.mock_user_id);
        if (input.preferred_language) {
          user.preferred_language = input.preferred_language;
        }

        return createSession(user);
      },
      me(userId?: string) {
        return createSession(findUser(userId));
      }
    },
    events: {
      list(params: PageParams = {}) {
        const events = state.events.filter(
          (event) =>
            keywordMatch(event.title_zh, params.keyword) ||
            keywordMatch(event.title_en, params.keyword) ||
            keywordMatch(event.summary_zh, params.keyword) ||
            keywordMatch(event.summary_en, params.keyword)
        );

        return paginate(events, params);
      },
      detail(id: string) {
        return state.events.find((event) => event._id === id) ?? null;
      },
      createRegistration(
        eventId: string,
        input: {
          contact_name: string;
          contact_phone: string;
          attendee_count: number;
          source_channel: string;
        },
        actorId?: string
      ) {
        const registration: EventRegistration = {
          _id: idFrom("reg"),
          event_id: eventId,
          user_id: findUser(actorId)._id,
          contact_name: input.contact_name,
          contact_phone: input.contact_phone,
          attendee_count: input.attendee_count,
          registration_status: "confirmed",
          ticket_id: idFrom("ticket"),
          source_channel: input.source_channel
        };
        const ticket: EventTicket = {
          _id: registration.ticket_id,
          registration_id: registration._id,
          ticket_code: `TZL-${Date.now()}`,
          qr_file_id: `cloud://${registration.ticket_id}`,
          qr_cloud_path: `${FILE_PATH_RULES.tickets}${registration.ticket_id}.png`,
          visibility: "private",
          status: "valid",
          issued_at: new Date().toISOString(),
          used_at: null
        };

        state.registrations.unshift(registration);
        state.tickets.unshift(ticket);

        return { registration, ticket };
      },
      listMyRegistrations(actorId?: string) {
        return state.registrations.filter(
          (registration) => registration.user_id === findUser(actorId)._id
        );
      },
      getTicketByRegistration(registrationId: string) {
        const registration = state.registrations.find(
          (item) => item._id === registrationId
        );

        if (!registration) {
          return null;
        }

        return (
          state.tickets.find((ticket) => ticket._id === registration.ticket_id) ?? null
        );
      },
      create(input: Partial<Event>, actorId?: string) {
        const event: Event = {
          _id: idFrom("event"),
          community_id: "tongzilin",
          title_zh: input.title_zh ?? "",
          title_en: input.title_en ?? "",
          summary_zh: input.summary_zh ?? "",
          summary_en: input.summary_en ?? "",
          content_zh: input.content_zh ?? "",
          content_en: input.content_en ?? "",
          cover_file_id: input.cover_file_id ?? "cloud://placeholder-cover",
          cover_cloud_path:
            input.cover_cloud_path ?? "public/events/placeholder/cover.jpg",
          cover_url:
            input.cover_url ??
            "https://example.com/public/events/placeholder/cover.jpg",
          place_id: input.place_id,
          address_text: input.address_text ?? "",
          location: input.location ?? { latitude: 30.615, longitude: 104.062 },
          start_time: input.start_time ?? new Date().toISOString(),
          end_time: input.end_time ?? new Date().toISOString(),
          signup_deadline: input.signup_deadline ?? new Date().toISOString(),
          capacity: input.capacity ?? 30,
          organizer_user_id: actorId ?? state.users[0]._id,
          review_status: "draft",
          publish_status: "draft"
        };

        state.events.unshift(event);
        return event;
      },
      update(id: string, input: Partial<Event>) {
        const existing = state.events.find((event) => event._id === id);
        if (!existing) {
          return null;
        }
        Object.assign(existing, input);
        return existing;
      },
      review(
        id: string,
        input: { review_status: Event["review_status"]; publish_status?: Event["publish_status"] }
      ) {
        const existing = state.events.find((event) => event._id === id);
        if (!existing) {
          return null;
        }

        existing.review_status = input.review_status;
        if (input.publish_status) {
          existing.publish_status = input.publish_status;
        }
        return existing;
      },
      checkin(id: string, ticketId: string) {
        const event = state.events.find((item) => item._id === id);
        const ticket = state.tickets.find((item) => item._id === ticketId);
        if (!event || !ticket) {
          return null;
        }

        ticket.status = "used";
        ticket.used_at = new Date().toISOString();
        return ticket;
      }
    },
    posts: {
      list(params: PageParams = {}) {
        const posts = state.posts.filter(
          (post) =>
            keywordMatch(post.title, params.keyword) ||
            keywordMatch(post.content, params.keyword)
        );

        return paginate(posts, params);
      },
      detail(id: string) {
        return state.posts.find((post) => post._id === id) ?? null;
      },
      create(input: Partial<Post>, actorId?: string) {
        const post: Post = {
          _id: idFrom("post"),
          author_user_id: findUser(actorId)._id,
          community_id: "tongzilin",
          title: input.title ?? "",
          content: input.content ?? "",
          language: input.language ?? "zh",
          tag_ids: input.tag_ids ?? [],
          location_text: input.location_text ?? null,
          image_file_ids: input.image_file_ids ?? [],
          image_urls: input.image_urls ?? [],
          status: "visible",
          review_status: "visible"
        };
        state.posts.unshift(post);
        return post;
      },
      createComment(postId: string, input: Pick<Comment, "content" | "language">, actorId?: string) {
        const comment: Comment = {
          _id: idFrom("comment"),
          post_id: postId,
          author_user_id: findUser(actorId)._id,
          content: input.content,
          language: input.language,
          created_at: new Date().toISOString()
        };
        state.comments.unshift(comment);
        return comment;
      },
      report(id: string) {
        const post = state.posts.find((item) => item._id === id);
        if (!post) {
          return null;
        }
        post.review_status = "reported";
        return post;
      },
      moderate(id: string, input: { review_status: Post["review_status"] }) {
        const post = state.posts.find((item) => item._id === id);
        if (!post) {
          return null;
        }
        post.review_status = input.review_status;
        post.status = input.review_status;
        return post;
      }
    },
    places: {
      list(params: PageParams = {}) {
        const places = state.places.filter(
          (place) =>
            keywordMatch(place.name_zh, params.keyword) ||
            keywordMatch(place.name_en, params.keyword) ||
            keywordMatch(place.intro_zh, params.keyword) ||
            keywordMatch(place.intro_en, params.keyword)
        );
        return paginate(places, params);
      },
      detail(id: string) {
        return state.places.find((place) => place._id === id) ?? null;
      },
      mapMarkers() {
        return state.places.map((place) => ({
          _id: place._id,
          name_zh: place.name_zh,
          name_en: place.name_en,
          location: place.location
        }));
      },
      create(input: Partial<Place>) {
        const place: Place = {
          _id: idFrom("place"),
          community_id: "tongzilin",
          name_zh: input.name_zh ?? "",
          name_en: input.name_en ?? "",
          category_level_1: input.category_level_1 ?? "",
          category_level_2: input.category_level_2 ?? "",
          address_zh: input.address_zh ?? "",
          address_en: input.address_en ?? "",
          location: input.location ?? { latitude: 30.615, longitude: 104.062 },
          tencent_map_poi_id: input.tencent_map_poi_id ?? null,
          business_hours_zh: input.business_hours_zh ?? "",
          business_hours_en: input.business_hours_en ?? "",
          intro_zh: input.intro_zh ?? "",
          intro_en: input.intro_en ?? "",
          gallery_file_ids: input.gallery_file_ids ?? [],
          gallery_urls: input.gallery_urls ?? [],
          status: "draft"
        };

        state.places.unshift(place);
        return place;
      },
      update(id: string, input: Partial<Place>) {
        const existing = state.places.find((place) => place._id === id);
        if (!existing) {
          return null;
        }
        Object.assign(existing, input);
        return existing;
      }
    },
    announcements: {
      list(params: PageParams = {}) {
        return paginate(state.announcements, params);
      },
      detail(id: string) {
        return state.announcements.find((item) => item._id === id) ?? null;
      }
    },
    notifications: {
      list(actorId?: string) {
        return state.notifications.filter(
          (notification) => notification.user_id === findUser(actorId)._id
        );
      },
      markRead(id: string, actorId?: string) {
        const notification = state.notifications.find(
          (item) => item._id === id && item.user_id === findUser(actorId)._id
        );
        if (!notification) {
          return null;
        }
        notification.status = "read";
        return notification;
      }
    },
    files: {
      createUploadRequest(input: {
        biz_type: string;
        biz_id: string;
        file_name: string;
        target_prefix: string;
      }) {
        const cloud_path = `${input.target_prefix}${input.biz_id}/${input.file_name}`;
        return {
          cloud_path,
          upload_url: `https://example.com/upload/${encodeURIComponent(cloud_path)}`,
          expires_in: 900
        };
      },
      complete(input: {
        biz_type: string;
        biz_id: string;
        file_id: string;
        cloud_path: string;
        visibility: FileAsset["visibility"];
      }, actorId?: string) {
        const asset: FileAsset = {
          _id: idFrom("file"),
          file_id: input.file_id,
          cloud_path: input.cloud_path,
          visibility: input.visibility,
          biz_type: input.biz_type,
          biz_id: input.biz_id,
          uploaded_by: findUser(actorId)._id,
          status: "active"
        };
        state.fileAssets.unshift(asset);
        return asset;
      },
      privateUrl(input: { file_id: string }) {
        return {
          temp_url: `https://example.com/temp/${input.file_id}`,
          expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString()
        };
      }
    },
    _state: state
  };
};
