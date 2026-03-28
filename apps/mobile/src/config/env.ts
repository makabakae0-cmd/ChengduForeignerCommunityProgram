export const mobileEnv = {
  apiMode: import.meta.env.VITE_API_MODE ?? "mock",
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8787",
  actorId: import.meta.env.VITE_MOCK_ACTOR_ID ?? "user_001"
};
