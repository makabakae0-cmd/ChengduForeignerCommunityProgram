import {
  createFetchRequester,
  createHttpClient,
  createMockClient,
  type HttpRequester
} from "@community-map/shared";

import { mobileEnv } from "@/config/env";

const createUniRequester = (): HttpRequester => {
  if (typeof uni === "undefined" || typeof uni.request !== "function") {
    return createFetchRequester();
  }

  return (method, url, body, headers = {}) =>
    new Promise((resolve, reject) => {
      const uniMethod = method === "PATCH" ? "POST" : method;
      uni.request({
        url,
        method: uniMethod,
        data: body as Record<string, unknown> | undefined,
        header: headers,
        success: (result) => resolve(result.data as any),
        fail: reject
      });
    });
};

export const mobileApi =
  mobileEnv.apiMode === "mock"
    ? createMockClient({ actorId: mobileEnv.actorId })
    : createHttpClient({
        actorId: mobileEnv.actorId,
        baseUrl: mobileEnv.apiBaseUrl,
        requester: createUniRequester()
      });
