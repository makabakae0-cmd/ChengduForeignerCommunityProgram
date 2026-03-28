import Router from "@koa/router";
import { LoginRequestSchema } from "@community-map/shared";

import { parseOrThrow, sendSuccess } from "../lib/http";

export const registerAuthRoutes = (router: Router) => {
  router.post("/auth/login", async (ctx) => {
    const input = parseOrThrow(LoginRequestSchema, ctx.request.body);
    const session = await ctx.state.provider.auth.login(input);
    sendSuccess(ctx, session);
  });

  router.get("/auth/me", async (ctx) => {
    const actor = ctx.state.actor;
    const session = await ctx.state.provider.auth.me(actor?._id);
    sendSuccess(ctx, session);
  });
};
