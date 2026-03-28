import { z } from "zod";

import {
  EVENT_PUBLISH_STATUSES,
  EVENT_REGISTRATION_STATUSES,
  EVENT_REVIEW_STATUSES,
  EVENT_TICKET_STATUSES,
  PLACE_STATUSES,
  POST_CONTENT_STATUSES
} from "../enums";
import {
  CoordinatesSchema,
  FileVisibilitySchema,
  LocaleSchema,
  NotificationStatusSchema,
  RoleFlagSchema
} from "./common";

export const UserSchema = z.object({
  _id: z.string(),
  openid: z.string().optional(),
  unionid: z.string().optional(),
  nickname: z.string(),
  avatar_url: z.string().url(),
  phone: z.string().optional(),
  preferred_language: LocaleSchema,
  role_flags: z.array(RoleFlagSchema),
  status: z.string()
});

export const EventSchema = z.object({
  _id: z.string(),
  community_id: z.string(),
  title_zh: z.string(),
  title_en: z.string(),
  summary_zh: z.string(),
  summary_en: z.string(),
  content_zh: z.string(),
  content_en: z.string(),
  cover_file_id: z.string(),
  cover_cloud_path: z.string(),
  cover_url: z.string().url(),
  place_id: z.string().optional(),
  address_text: z.string(),
  location: CoordinatesSchema,
  start_time: z.string(),
  end_time: z.string(),
  signup_deadline: z.string(),
  capacity: z.number().int().positive(),
  organizer_user_id: z.string(),
  review_status: z.enum(EVENT_REVIEW_STATUSES),
  publish_status: z.enum(EVENT_PUBLISH_STATUSES)
});

export const EventRegistrationSchema = z.object({
  _id: z.string(),
  event_id: z.string(),
  user_id: z.string(),
  contact_name: z.string(),
  contact_phone: z.string(),
  attendee_count: z.number().int().min(1),
  registration_status: z.enum(EVENT_REGISTRATION_STATUSES),
  ticket_id: z.string(),
  source_channel: z.string()
});

export const EventTicketSchema = z.object({
  _id: z.string(),
  registration_id: z.string(),
  ticket_code: z.string(),
  qr_file_id: z.string(),
  qr_cloud_path: z.string(),
  visibility: FileVisibilitySchema,
  status: z.enum(EVENT_TICKET_STATUSES),
  issued_at: z.string(),
  used_at: z.string().nullable()
});

export const PlaceSchema = z.object({
  _id: z.string(),
  community_id: z.string(),
  name_zh: z.string(),
  name_en: z.string(),
  category_level_1: z.string(),
  category_level_2: z.string(),
  address_zh: z.string(),
  address_en: z.string(),
  location: CoordinatesSchema,
  tencent_map_poi_id: z.string().nullable(),
  business_hours_zh: z.string(),
  business_hours_en: z.string(),
  intro_zh: z.string(),
  intro_en: z.string(),
  gallery_file_ids: z.array(z.string()),
  gallery_urls: z.array(z.string().url()),
  status: z.enum(PLACE_STATUSES)
});

export const PostSchema = z.object({
  _id: z.string(),
  author_user_id: z.string(),
  community_id: z.string(),
  title: z.string(),
  content: z.string(),
  language: LocaleSchema,
  tag_ids: z.array(z.string()),
  location_text: z.string().nullable(),
  image_file_ids: z.array(z.string()),
  image_urls: z.array(z.string().url()),
  status: z.enum(POST_CONTENT_STATUSES),
  review_status: z.enum(POST_CONTENT_STATUSES)
});

export const CommentSchema = z.object({
  _id: z.string(),
  post_id: z.string(),
  author_user_id: z.string(),
  content: z.string(),
  language: LocaleSchema,
  created_at: z.string()
});

export const AnnouncementSchema = z.object({
  _id: z.string(),
  community_id: z.string(),
  title_zh: z.string(),
  title_en: z.string(),
  summary_zh: z.string(),
  summary_en: z.string(),
  content_zh: z.string(),
  content_en: z.string(),
  cover_file_id: z.string(),
  cover_url: z.string().url(),
  status: z.string(),
  published_at: z.string()
});

export const NotificationSchema = z.object({
  _id: z.string(),
  user_id: z.string(),
  title: z.string(),
  body: z.string(),
  status: NotificationStatusSchema,
  created_at: z.string()
});

export const FileAssetSchema = z.object({
  _id: z.string(),
  file_id: z.string(),
  cloud_path: z.string(),
  visibility: FileVisibilitySchema,
  biz_type: z.string(),
  biz_id: z.string(),
  uploaded_by: z.string(),
  status: z.string()
});

export const AuthSessionSchema = z.object({
  user: UserSchema,
  token: z.string()
});
