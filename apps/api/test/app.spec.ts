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

      const registerResponse = await fetch(`${baseUrl}/events/${eventId}/registrations`, {
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
      });
      const registerData = await registerResponse.json();
      expect(registerResponse.status).toBe(201);
      expect(registerData.data.ticket.ticket_code).toContain("TZL");

      const invalidRegistration = await fetch(`${baseUrl}/events/${eventId}/registrations`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          contact_name: "",
          contact_phone: "1",
          attendee_count: 0
        })
      });
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

      const placeDetailResponse = await fetch(
        `${baseUrl}/places/${placesData.data.items[0]._id}`
      );
      expect(placeDetailResponse.status).toBe(200);

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
