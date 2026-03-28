import { defineContract } from "./define-contract";
import { AnnouncementListQuerySchema } from "../schemas/announcements";
import { AnnouncementSchema } from "../schemas/entities";

export const announcementContracts = {
  list: defineContract({
    method: "GET",
    path: "/announcements",
    request: AnnouncementListQuerySchema,
    response: AnnouncementSchema
  }),
  detail: defineContract({
    method: "GET",
    path: "/announcements/:id",
    response: AnnouncementSchema
  })
};
