import Router from "@koa/router";
import {
  CompleteUploadInputSchema,
  CreateUploadRequestInputSchema,
  PrivateUrlRequestInputSchema
} from "@community-map/shared";

import { parseOrThrow, sendSuccess } from "../lib/http";

export const registerFileRoutes = (router: Router) => {
  router.post("/files/upload-requests", async (ctx) => {
    const input = parseOrThrow(CreateUploadRequestInputSchema, ctx.request.body);
    const data = await ctx.state.provider.files.createUploadRequest(input);
    sendSuccess(ctx, data, 201);
  });

  router.post("/files/complete", async (ctx) => {
    const input = parseOrThrow(CompleteUploadInputSchema, ctx.request.body);
    const data = await ctx.state.provider.files.complete(input, ctx.state.actor._id);
    sendSuccess(ctx, data, 201);
  });

  router.post("/files/private-url", async (ctx) => {
    const input = parseOrThrow(PrivateUrlRequestInputSchema, ctx.request.body);
    const data = await ctx.state.provider.files.privateUrl(input);
    sendSuccess(ctx, data);
  });
};
