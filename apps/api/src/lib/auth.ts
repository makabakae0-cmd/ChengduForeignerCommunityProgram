import type { Context, Next } from "koa";
import type { RoleFlag, User } from "@community-map/shared";

import { apiError } from "./errors";

export interface AuthenticatedState {
  actor: User;
  requestId: string;
}

export const actorMiddleware = async (ctx: Context, next: Next) => {
  const actor = await ctx.state.provider.auth.resolveActor(
    ctx.get("x-mock-user-id") || undefined
  );
  ctx.state.actor = actor;
  await next();
};

export const requireRole =
  (...roles: RoleFlag[]) =>
  async (ctx: Context, next: Next) => {
    const actor = ctx.state.actor as User | undefined;
    if (!actor) {
      throw apiError("UNAUTHORIZED", "Authentication is required.", 401);
    }
    if (!roles.some((role) => actor.role_flags.includes(role))) {
      throw apiError("FORBIDDEN", "Insufficient permission.", 403);
    }
    await next();
  };
