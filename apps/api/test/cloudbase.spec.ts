import { describe, expect, it } from "vitest";

import { main } from "../src/cloudbase";

describe("cloudbase event handler", () => {
  it("returns event list with the same envelope shape", async () => {
    const response = await main(
      {},
      {
        eventID: "req_cloud_001",
        httpContext: {
          url: "http://localhost/events",
          httpMethod: "GET",
          headers: {
            "x-mock-user-id": "user_001"
          }
        }
      } as any
    );

    expect(response.statusCode).toBe(200);
    expect((response.body as any).success).toBe(true);
    expect((response.body as any).data.items.length).toBeGreaterThan(0);
  });
});
