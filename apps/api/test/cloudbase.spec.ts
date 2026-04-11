import { describe, expect, it } from "vitest";

import { main } from "../src/cloudbase";
import { createCloudbaseProvider } from "../src/providers/cloudbase";
import { createMockProvider } from "../src/providers/mock";

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

  it("returns places list, detail, and markers in cloudbase mode", async () => {
    process.env.API_PROVIDER = "cloudbase";

    try {
      const listResponse = await main(
        {},
        {
          eventID: "req_cloud_002",
          httpContext: {
            url: "http://localhost/places?communityId=tongzilin&recommended=true",
            httpMethod: "GET"
          }
        } as any
      );
      const listBody = listResponse.body as any;

      expect(listResponse.statusCode).toBe(200);
      expect(listBody.success).toBe(true);
      expect(listBody.data.items.every((item: { is_recommended: boolean }) => item.is_recommended)).toBe(true);

      const placeId = listBody.data.items[0]._id;
      const detailResponse = await main(
        {},
        {
          eventID: "req_cloud_003",
          httpContext: {
            url: `http://localhost/places/${placeId}`,
            httpMethod: "GET"
          }
        } as any
      );
      const detailBody = detailResponse.body as any;

      expect(detailResponse.statusCode).toBe(200);
      expect(detailBody.data).toHaveProperty("navigation");
      expect(detailBody.data).toHaveProperty("gallery_urls");

      const markerResponse = await main(
        {},
        {
          eventID: "req_cloud_004",
          httpContext: {
            url: "http://localhost/places/map-markers",
            httpMethod: "GET"
          }
        } as any
      );
      const markerBody = markerResponse.body as any;

      expect(markerResponse.statusCode).toBe(200);
      expect(markerBody.data[0]).toHaveProperty("location");
      expect(markerBody.data[0]).not.toHaveProperty("navigation");
      expect(markerBody.data[0]).not.toHaveProperty("gallery_urls");
    } finally {
      delete process.env.API_PROVIDER;
    }
  });

  it("keeps places query semantics aligned between mock and cloudbase providers", async () => {
    const mockProvider = createMockProvider();
    const cloudbaseProvider = createCloudbaseProvider();

    const query = {
      communityId: "tongzilin",
      recommended: true,
      tags: ["service"],
      sort: "recommended" as const
    };

    const [mockList, cloudbaseList, mockMarkers, cloudbaseMarkers] =
      await Promise.all([
        mockProvider.places.list(query),
        cloudbaseProvider.places.list(query),
        mockProvider.places.mapMarkers(),
        cloudbaseProvider.places.mapMarkers()
      ]);

    expect(cloudbaseList).toEqual(mockList);
    expect(cloudbaseMarkers).toEqual(mockMarkers);

    const mockDetail = await mockProvider.places.detail(mockList.items[0]._id);
    const cloudbaseDetail = await cloudbaseProvider.places.detail(
      cloudbaseList.items[0]._id
    );

    expect(cloudbaseDetail).toEqual(mockDetail);
  });
});
