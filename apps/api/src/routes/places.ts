import Router from "@koa/router";
import {
  CreatePlaceInputSchema,
  PlaceListQuerySchema,
  UpdatePlaceInputSchema
} from "@community-map/shared";

import { requireRole } from "../lib/auth";
import { apiError } from "../lib/errors";
import { parseOrThrow, sendSuccess } from "../lib/http";

export const registerPlaceRoutes = (router: Router) => {
  router.get("/places", async (ctx) => {
    const query = parseOrThrow(PlaceListQuerySchema, ctx.query);
    const data = await ctx.state.provider.places.list(query);
    sendSuccess(ctx, data);
  });

  router.get("/places/map-markers", async (ctx) => {
    const data = await ctx.state.provider.places.mapMarkers();
    sendSuccess(ctx, data);
  });

  router.get("/places/:id", async (ctx) => {
    const place = await ctx.state.provider.places.detail(ctx.params.id);
    if (!place) {
      throw apiError("NOT_FOUND", "Place not found.", 404);
    }
    sendSuccess(ctx, place);
  });

  router.get(
    "/admin/places",
    requireRole("community_admin", "system_admin"),
    async (ctx) => {
      const data = await ctx.state.provider.places.listAdmin();
      sendSuccess(ctx, data);
    }
  );

  router.post("/admin/places", requireRole("community_admin", "system_admin"), async (ctx) => {
    const input = parseOrThrow(CreatePlaceInputSchema, ctx.request.body);
    const place = await ctx.state.provider.places.create(input);
    sendSuccess(ctx, place, 201);
  });

  router.patch(
    "/admin/places/:id",
    requireRole("community_admin", "system_admin"),
    async (ctx) => {
      const input = parseOrThrow(UpdatePlaceInputSchema, ctx.request.body);
      const place = await ctx.state.provider.places.update(ctx.params.id, input);
      if (!place) {
        throw apiError("NOT_FOUND", "Place not found.", 404);
      }
      sendSuccess(ctx, place);
    }
  );
};
