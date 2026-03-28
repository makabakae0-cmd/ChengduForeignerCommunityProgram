import {
  API_ERROR_CODES,
  CreateApiSuccessSchema,
  EVENT_REGISTRATION_STATUSES,
  FILE_PATH_RULES,
  FileAssetSchema,
  LocaleSchema,
  PageResultSchema,
  PlaceSchema,
  PostSchema,
  UserSchema
} from "@community-map/shared";
import { describe, expect, it } from "vitest";

describe("shared contracts", () => {
  it("accepts a valid bilingual place payload", () => {
    const place = PlaceSchema.parse({
      _id: "place_001",
      community_id: "tongzilin",
      name_zh: "桐梓林社区中心",
      name_en: "Tongzilin Community Center",
      category_level_1: "service",
      category_level_2: "community",
      address_zh: "成都",
      address_en: "Chengdu",
      location: { latitude: 30.6, longitude: 104.0 },
      tencent_map_poi_id: null,
      business_hours_zh: "周一至周日",
      business_hours_en: "Every day",
      intro_zh: "简介",
      intro_en: "Intro",
      gallery_file_ids: [],
      gallery_urls: [],
      status: "published"
    });

    expect(place.name_en).toBe("Tongzilin Community Center");
  });

  it("rejects invalid locale fields", () => {
    expect(() =>
      UserSchema.parse({
        _id: "user_001",
        nickname: "Jerry",
        avatar_url: "https://example.com/avatar.jpg",
        preferred_language: "jp",
        role_flags: ["user"],
        status: "active"
      })
    ).toThrow();
  });

  it("keeps page envelope, file rules, and enums stable", () => {
    const successSchema = CreateApiSuccessSchema(
      PageResultSchema(PostSchema)
    );
    const fileAsset = FileAssetSchema.parse({
      _id: "file_001",
      file_id: "cloud://id",
      cloud_path: "public/posts/post_001/1.jpg",
      visibility: "public",
      biz_type: "post_image",
      biz_id: "post_001",
      uploaded_by: "user_001",
      status: "active"
    });
    const parsed = successSchema.parse({
      success: true,
      requestId: "req_001",
      data: {
        items: [],
        page: 1,
        pageSize: 10,
        total: 0
      }
    });

    expect(parsed.data.total).toBe(0);
    expect(fileAsset.cloud_path).toBe(FILE_PATH_RULES.postImages + "post_001/1.jpg");
    expect({
      locales: LocaleSchema.options,
      eventRegistrationStatuses: EVENT_REGISTRATION_STATUSES,
      apiErrorCodes: API_ERROR_CODES,
      filePaths: FILE_PATH_RULES
    }).toMatchSnapshot();
  });
});
