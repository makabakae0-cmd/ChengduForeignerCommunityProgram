import { z } from "zod";

export const PLACE_TOP_LEVEL_CATEGORIES = [
  "public-service",
  "food-drink",
  "shopping",
  "lifestyle",
  "education",
  "health-wellness",
  "entertainment",
  "outdoor-sports",
  "transport",
  "community"
] as const;

export const PlaceTopLevelCategorySchema = z.enum(PLACE_TOP_LEVEL_CATEGORIES);
