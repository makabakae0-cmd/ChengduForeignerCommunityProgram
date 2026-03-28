import { defineContract } from "./define-contract";
import { NotificationSchema } from "../schemas/entities";
import { z } from "zod";

export const notificationsContracts = {
  list: defineContract({
    method: "GET",
    path: "/notifications",
    response: NotificationSchema
  }),
  markRead: defineContract({
    method: "POST",
    path: "/notifications/:id/read",
    response: NotificationSchema,
    request: z.object({})
  })
};
