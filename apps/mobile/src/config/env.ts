export const mobileEnv = {
  apiMode: import.meta.env.VITE_API_MODE ?? "mock",
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8787",
  cloudbaseEnvId:
    import.meta.env.VITE_CLOUDBASE_ENV_ID ?? "cloud1-d7gxdk8t43bd639c0",
  cloudFunctionName:
    import.meta.env.VITE_CLOUDBASE_FUNCTION_NAME ?? "community-map-api",
  actorId: import.meta.env.VITE_MOCK_ACTOR_ID ?? "user_001"
};
