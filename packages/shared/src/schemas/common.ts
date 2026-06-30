import { z } from "zod";

import {
  API_ERROR_CODES,
  FILE_VISIBILITIES,
  LOCALES,
  NOTIFICATION_STATUSES,
  ROLE_FLAGS
} from "../enums";

export const LocaleSchema = z.enum(LOCALES);
export const RoleFlagSchema = z.enum(ROLE_FLAGS);
export const ApiErrorCodeSchema = z.enum(API_ERROR_CODES);
export const FileVisibilitySchema = z.enum(FILE_VISIBILITIES);
export const NotificationStatusSchema = z.enum(NOTIFICATION_STATUSES);

export const CoordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number()
});

export const PageQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(10),
  keyword: z.string().trim().min(1).optional(),
  communityId: z.string().default("tongzilin")
});

export const PageResultSchema = <TItem extends z.ZodTypeAny>(itemSchema: TItem) =>
  z.object({
    items: z.array(itemSchema),
    page: z.number().int().min(1),
    pageSize: z.number().int().min(1),
    total: z.number().int().min(0)
  });

export const ApiErrorSchema = z.object({
  code: ApiErrorCodeSchema,
  message: z.string(),
  details: z.unknown().optional()
});

export const CreateApiSuccessSchema = <TData extends z.ZodTypeAny>(
  dataSchema: TData
) =>
  z.object({
    success: z.literal(true),
    data: dataSchema,
    requestId: z.string()
  });

export const ApiFailureResultSchema = z.object({
  success: z.literal(false),
  error: ApiErrorSchema,
  requestId: z.string()
});
