import { z } from "zod";

import { PlaceSchema } from "./entities";

export const PlaceListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(10),
  communityId: z.string().default("tongzilin"),
  keyword: z.string().trim().optional()
});

export const CreatePlaceInputSchema = PlaceSchema.pick({
  name_zh: true,
  name_en: true,
  category_level_1: true,
  category_level_2: true,
  address_zh: true,
  address_en: true,
  location: true,
  business_hours_zh: true,
  business_hours_en: true,
  intro_zh: true,
  intro_en: true
}).extend({
  gallery_file_ids: z.array(z.string()).default([]),
  gallery_urls: z.array(z.string().url()).default([]),
  tencent_map_poi_id: z.string().nullable().default(null)
});

export const UpdatePlaceInputSchema = CreatePlaceInputSchema.partial();
