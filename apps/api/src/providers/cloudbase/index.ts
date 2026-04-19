import type { ApiProvider } from "../types";
import { createMockProvider } from "../mock";

export const createCloudbaseProvider = (): ApiProvider => {
  return createMockProvider();
};
