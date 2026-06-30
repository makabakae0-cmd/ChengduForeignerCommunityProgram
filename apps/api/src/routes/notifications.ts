import Router from "@koa/router";

import { apiError } from "../lib/errors";
import { sendSuccess } from "../lib/http";

export const registerNotificationRoutes = (router: Router) => {
  router.get("/notifications", async (ctx) => {
    const items = await ctx.state.provider.notifications.list(ctx.state.actor._id);
    sendSuccess(ctx, items);
  });

  router.post("/notifications/:id/read", async (ctx) => {
    const notification = await ctx.state.provider.notifications.markRead(
      ctx.params.id,
      ctx.state.actor._id
    );
    if (!notification) {
      throw apiError("NOT_FOUND", "Notification not found.", 404);
    }
    sendSuccess(ctx, notification);
  });
};
