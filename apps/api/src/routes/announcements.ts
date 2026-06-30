import Router from "@koa/router";
import { AnnouncementListQuerySchema } from "@community-map/shared";

import { apiError } from "../lib/errors";
import { parseOrThrow, sendSuccess } from "../lib/http";

export const registerAnnouncementRoutes = (router: Router) => {
  router.get("/announcements", async (ctx) => {
    const query = parseOrThrow(AnnouncementListQuerySchema, ctx.query);
    const data = await ctx.state.provider.announcements.list(query);
    sendSuccess(ctx, data);
  });

  router.get("/announcements/:id", async (ctx) => {
    const item = await ctx.state.provider.announcements.detail(ctx.params.id);
    if (!item) {
      throw apiError("NOT_FOUND", "Announcement not found.", 404);
    }
    sendSuccess(ctx, item);
  });
};
