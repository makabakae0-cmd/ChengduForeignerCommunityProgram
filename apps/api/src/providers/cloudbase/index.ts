import type { ApiProvider } from "../types";
import { createMockProvider } from "../mock";

const notImplemented = async (): Promise<never> => {
  throw new Error(
    "CloudBase provider only includes the places v1 browsing baseline in this phase."
  );
};

export const createCloudbaseProvider = (): ApiProvider => {
  const provider = createMockProvider();

  return {
    ...provider,
    places: {
      ...provider.places,
      listAdmin: notImplemented,
      create: notImplemented,
      update: notImplemented
    }
  };
};
