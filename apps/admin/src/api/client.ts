import {
  FILE_PATH_RULES,
  createFetchRequester,
  createHttpClient,
  createMockClient
} from "@community-map/shared";

const apiMode = import.meta.env.VITE_API_MODE ?? "mock";
const actorId = import.meta.env.VITE_MOCK_ACTOR_ID ?? "user_001";
const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8787";

export const adminApi =
  apiMode === "mock"
    ? createMockClient({ actorId })
    : createHttpClient({
        actorId,
        baseUrl,
        requester: createFetchRequester()
      });

export { FILE_PATH_RULES };
