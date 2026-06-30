import type { ApiProvider } from "./types";

import { createCloudbaseProvider } from "./cloudbase";
import { createMockProvider } from "./mock";

const providerCache = new Map<string, ApiProvider>();

export const createProvider = (
  mode = process.env.API_PROVIDER ?? "mock",
  options?: {
    fresh?: boolean;
  }
): ApiProvider => {
  if (options?.fresh) {
    return mode === "cloudbase" ? createCloudbaseProvider() : createMockProvider();
  }

  const cachedProvider = providerCache.get(mode);
  if (cachedProvider) {
    return cachedProvider;
  }

  const provider =
    mode === "cloudbase" ? createCloudbaseProvider() : createMockProvider();
  providerCache.set(mode, provider);
  return provider;
};
