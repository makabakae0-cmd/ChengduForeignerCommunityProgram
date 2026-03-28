import { z } from "zod";

import { LocaleSchema } from "./common";

export const LoginRequestSchema = z.object({
  code: z.string().optional(),
  mock_user_id: z.string().optional(),
  preferred_language: LocaleSchema.optional()
});
