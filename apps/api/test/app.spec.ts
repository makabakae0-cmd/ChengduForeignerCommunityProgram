import { createServer } from "node:http";

import { createApp } from "../src/app";

const createTestBaseUrl = async () => {
  const app = createApp("mock");
  const server = createServer(app.callback());

  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve());
  });

  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Failed to create test server.");
  }

  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () =>
      new Promise<void>((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      })
  };
};

describe("api routes", () => {
  it("serves events list, detail, registration, posts, places, announcements, and validation errors", async () => {
    const { baseUrl, close } = await createTestBaseUrl();

    try {
      const eventsResponse = await fetch(`${baseUrl}/events`);
      const eventsData = await eventsResponse.json();
      expect(eventsResponse.status).toBe(200);
      expect(eventsData.data.items.length).toBeGreaterThan(0);

      const eventId = eventsData.data.items[0]._id;
      const detailResponse = await fetch(`${baseUrl}/events/${eventId}`);
      expect(detailResponse.status).toBe(200);

      const registerResponse = await fetch(
        `${baseUrl}/events/${eventId}/registrations`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            contact_name: "Jerry",
            contact_phone: "13800000000",
            attendee_count: 1,
            source_channel: "miniapp"
          })
        }
      );
      const registerData = await registerResponse.json();
      expect(registerResponse.status).toBe(201);
      expect(registerData.data.ticket.ticket_code).toContain("TZL");

      const invalidRegistration = await fetch(
        `${baseUrl}/events/${eventId}/registrations`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            contact_name: "",
            contact_phone: "1",
            attendee_count: 0
          })
        }
      );
      expect(invalidRegistration.status).toBe(400);

      const postsResponse = await fetch(`${baseUrl}/discover/posts`);
      expect(postsResponse.status).toBe(200);

      const createPostResponse = await fetch(`${baseUrl}/discover/posts`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          title: "Need a local dentist recommendation",
          content: "Prefer around Tongzilin station.",
          language: "en",
          tag_ids: ["help"],
          location_text: "Tongzilin",
          image_file_ids: [],
          image_urls: []
        })
      });
      expect(createPostResponse.status).toBe(201);

      const placesResponse = await fetch(`${baseUrl}/places`);
      const placesData = await placesResponse.json();
      expect(placesResponse.status).toBe(200);
      expect(placesData.data.items.length).toBeGreaterThan(0);
      expect(placesData.data.items[0]).toHaveProperty("short_address_zh");
      expect(placesData.data.items[0]).not.toHaveProperty("gallery_urls");

      const placeDetailResponse = await fetch(
        `${baseUrl}/places/${placesData.data.items[0]._id}`
      );
      const placeDetailData = await placeDetailResponse.json();
      expect(placeDetailResponse.status).toBe(200);
      expect(placeDetailData.data).toHaveProperty("navigation");
      expect(placeDetailData.data).toHaveProperty("share");

      const markersBeforeResponse = await fetch(
        `${baseUrl}/places/map-markers`
      );
      const markersBeforeData = await markersBeforeResponse.json();
      expect(markersBeforeResponse.status).toBe(200);
      expect(markersBeforeData.data.length).toBeGreaterThan(0);
      expect(markersBeforeData.data[0]).toHaveProperty("category_level_1");
      expect(markersBeforeData.data[0]).toHaveProperty("is_recommended");
      expect(markersBeforeData.data[0]).not.toHaveProperty("address_zh");

      const recommendedResponse = await fetch(
        `${baseUrl}/places?recommended=true`
      );
      const recommendedData = await recommendedResponse.json();
      expect(recommendedResponse.status).toBe(200);
      expect(recommendedData.data.items.every((item: { is_recommended: boolean }) => item.is_recommended)).toBe(true);

      const createDraftPlaceResponse = await fetch(`${baseUrl}/admin/places`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-mock-user-id": "user_001"
        },
        body: JSON.stringify({
          name_zh: "地图草稿地点",
          name_en: "Draft Map Place",
          cover_file_id: null,
          cover_url: null,
          category_level_1: "service",
          category_level_2: "community",
          tag_ids: ["service"],
          address_zh: "成都",
          address_en: "Chengdu",
          location: { latitude: 30.616, longitude: 104.063 },
          business_hours_zh: "周一至周日",
          business_hours_en: "Mon-Sun",
          intro_zh: "草稿",
          intro_en: "Draft",
          recommended_reason_zh: null,
          recommended_reason_en: null,
          is_recommended: false,
          recommended_rank: 0,
          gallery_file_ids: [],
          gallery_urls: [],
          tencent_map_poi_id: null,
          supports_navigation: true,
          supports_favorite: true,
          supports_share: true,
          status: "draft"
        })
      });
      const draftPlaceData = await createDraftPlaceResponse.json();
      expect(createDraftPlaceResponse.status).toBe(201);

      const markersAfterResponse = await fetch(`${baseUrl}/places/map-markers`);
      const markersAfterData = await markersAfterResponse.json();
      expect(markersAfterResponse.status).toBe(200);
      expect(
        markersAfterData.data.some(
          (item: { _id: string }) => item._id === draftPlaceData.data._id
        )
      ).toBe(false);

      const draftDetailResponse = await fetch(
        `${baseUrl}/places/${draftPlaceData.data._id}`
      );
      expect(draftDetailResponse.status).toBe(404);

      const adminPlacesResponse = await fetch(`${baseUrl}/admin/places`, {
        headers: {
          "x-mock-user-id": "user_001"
        }
      });
      const adminPlacesData = await adminPlacesResponse.json();
      expect(adminPlacesResponse.status).toBe(200);
      expect(adminPlacesData.data.items.some((item: { _id: string }) => item._id === draftPlaceData.data._id)).toBe(true);

      const announcementsResponse = await fetch(`${baseUrl}/announcements`);
      expect(announcementsResponse.status).toBe(200);
    } finally {
      await close();
    }
  });

  it("blocks admin routes for non-admin actors", async () => {
    const { baseUrl, close } = await createTestBaseUrl();

    try {
      const response = await fetch(`${baseUrl}/admin/events`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-mock-user-id": "user_002"
        },
        body: JSON.stringify({
          title_zh: "无权限活动",
          title_en: "Forbidden Event",
          summary_zh: "简介",
          summary_en: "Summary",
          content_zh: "正文",
          content_en: "Body",
          address_text: "Address",
          location: { latitude: 30.6, longitude: 104.0 },
          start_time: "2026-03-28T10:00:00+08:00",
          end_time: "2026-03-28T12:00:00+08:00",
          signup_deadline: "2026-03-27T18:00:00+08:00",
          capacity: 20
        })
      });
      const body = await response.json();

      expect(response.status).toBe(403);
      expect(body.error.code).toBe("FORBIDDEN");
    } finally {
      await close();
    }
  });
});
