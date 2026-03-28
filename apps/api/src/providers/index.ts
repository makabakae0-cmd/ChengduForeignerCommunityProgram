import type { ApiProvider } from "./types";

import { createCloudbaseProvider } from "./cloudbase";
import { createMockProvider } from "./mock";

export const createProvider = (mode = process.env.API_PROVIDER ?? "mock"): ApiProvider =>
  mode === "cloudbase" ? createCloudbaseProvider() : createMockProvider();
