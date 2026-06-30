import {
  API_ERROR_CODES,
  apiPaths,
  CreateApiSuccessSchema,
  DeletePlaceResponseSchema,
  EVENT_REGISTRATION_STATUSES,
  FILE_PATH_RULES,
  FileAssetSchema,
  LocaleSchema,
  PageResultSchema,
  PlaceDetailSchema,
  PlaceListItemSchema,
  PlaceListQuerySchema,
  PlaceMapMarkerSchema,
  PlacePoiSearchItemSchema,
  PlacePoiSearchQuerySchema,
  PlaceSchema,
  placeContracts,
  PostSchema,
  UpdatePlaceInputSchema,
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
      cover_file_id: null,
      cover_url: null,
      category_level_1: "public-service",
      category_level_2: "community",
      tag_ids: ["service"],
      address_zh: "成都",
      address_en: "Chengdu",
      location: { latitude: 30.6, longitude: 104.0 },
      tencent_map_poi_id: null,
      business_hours_zh: "周一至周日",
      business_hours_en: "Every day",
      intro_zh: "简介",
      intro_en: "Intro",
      recommended_reason_zh: null,
      recommended_reason_en: null,
      is_recommended: false,
      recommended_rank: 0,
      gallery_file_ids: [],
      gallery_urls: [],
      supports_navigation: true,
      supports_favorite: true,
      supports_share: true,
      status: "published"
    });

    expect(place.name_en).toBe("Tongzilin Community Center");
  });

  it("accepts split list and detail place payloads", () => {
    const item = PlaceListItemSchema.parse({
      _id: "place_001",
      name_zh: "桐梓林社区中心",
      name_en: "Tongzilin Community Center",
      cover_url: "https://example.com/place.jpg",
      category_level_1: "public-service",
      category_level_2: "community-center",
      short_address_zh: "成都市武侯区",
      short_address_en: "Wuhou District, Chengdu",
      summary_zh: "简介",
      summary_en: "Summary",
      tag_ids: ["service"],
      is_recommended: true,
      recommended_reason_zh: "推荐理由",
      recommended_reason_en: "Reason",
      supports_navigation: true
    });
    const detail = PlaceDetailSchema.parse({
      _id: "place_001",
      community_id: "tongzilin",
      name_zh: "桐梓林社区中心",
      name_en: "Tongzilin Community Center",
      cover_url: "https://example.com/place.jpg",
      category_level_1: "public-service",
      category_level_2: "community-center",
      tag_ids: ["service"],
      address_zh: "成都",
      address_en: "Chengdu",
      location: { latitude: 30.6, longitude: 104.0 },
      business_hours_zh: "周一至周日",
      business_hours_en: "Every day",
      intro_zh: "简介",
      intro_en: "Intro",
      gallery_media: [
        {
          file_id: "cloud://place-001-1",
          cloud_path: "public/places/place_001/1.jpg",
          url: "https://images.unsplash.com/photo-1494526585095-c41746248156",
          alt_zh: "桐梓林社区中心 图集 1",
          alt_en: "Tongzilin Community Center gallery 1"
        }
      ],
      gallery_urls: [
        "https://images.unsplash.com/photo-1494526585095-c41746248156"
      ],
      is_recommended: true,
      recommended_reason_zh: "推荐理由",
      recommended_reason_en: "Reason",
      supports_navigation: true,
      supports_favorite: true,
      supports_share: true,
      navigation: {
        latitude: 30.6,
        longitude: 104.0,
        name_zh: "桐梓林社区中心",
        name_en: "Tongzilin Community Center",
        address_zh: "成都",
        address_en: "Chengdu"
      },
      share: {
        title_zh: "桐梓林社区中心",
        title_en: "Tongzilin Community Center",
        summary_zh: "简介",
        summary_en: "Intro"
      }
    });

    expect(item.short_address_en).toContain("Chengdu");
    expect(detail.navigation.latitude).toBe(30.6);
  });

  it("accepts a place map marker payload", () => {
    const marker = PlaceMapMarkerSchema.parse({
      _id: "place_001",
      name_zh: "桐梓林社区中心",
      name_en: "Tongzilin Community Center",
      category_level_1: "public-service",
      is_recommended: true,
      location: {
        latitude: 30.615,
        longitude: 104.0625
      }
    });

    expect(marker.category_level_1).toBe("public-service");
  });

  it("normalizes the places list query contract", () => {
    const query = PlaceListQuerySchema.parse({
      page: "2",
      pageSize: "12",
      communityId: "tongzilin",
      keyword: "coffee",
      category: "cafe",
      tag: "english-friendly",
      recommended: "true",
      sort: "recommended"
    });

    expect(query.page).toBe(2);
    expect(query.pageSize).toBe(12);
    expect(query.communityId).toBe("tongzilin");
    expect(query.keyword).toBe("coffee");
    expect(query.category).toBe("cafe");
    expect(query.tag).toBe("english-friendly");
    expect(query.recommended).toBe(true);
    expect(query.sort).toBe("recommended");

    const defaults = PlaceListQuerySchema.parse({});

    expect(defaults).toEqual({
      page: 1,
      pageSize: 10,
      communityId: "tongzilin",
      sort: "recommended"
    });
  });

  it("exposes admin place update and delete contracts through shared paths", () => {
    const deleteEnvelope = CreateApiSuccessSchema(
      DeletePlaceResponseSchema
    ).parse({
      success: true,
      requestId: "req_delete_place",
      data: {
        deleted_id: "place_001"
      }
    });

    expect(placeContracts.adminUpdate).toMatchObject({
      method: "PATCH",
      path: "/admin/places/:id"
    });
    expect(placeContracts.adminDelete).toMatchObject({
      method: "DELETE",
      path: "/admin/places/:id"
    });
    expect(apiPaths.admin.updatePlace("place_001")).toBe(
      "/admin/places/place_001"
    );
    expect(apiPaths.admin.deletePlace("place_001")).toBe(
      "/admin/places/place_001"
    );
    expect(deleteEnvelope.data.deleted_id).toBe("place_001");
  });

  it("normalizes admin place POI search contracts", () => {
    const query = PlacePoiSearchQuerySchema.parse({
      keyword: " 桐梓林 "
    });
    const item = PlacePoiSearchItemSchema.parse({
      id: "poi_001",
      title: "桐梓林",
      address: "四川省成都市武侯区桐梓林路",
      category: "交通设施",
      location: {
        latitude: 30.615,
        longitude: 104.062
      },
      province: "四川省",
      city: "成都市",
      district: "武侯区"
    });

    expect(query.keyword).toBe("桐梓林");
    expect(item.location.latitude).toBe(30.615);
    expect(placeContracts.adminPoiSearch).toMatchObject({
      method: "GET",
      path: "/admin/places/poi-search"
    });
    expect(apiPaths.admin.searchPlacePoi).toBe("/admin/places/poi-search");
    expect(() => PlacePoiSearchQuerySchema.parse({ keyword: "" })).toThrow();
    expect(() =>
      PlacePoiSearchItemSchema.parse({
        ...item,
        location: {
          latitude: 999,
          longitude: 104.062
        }
      })
    ).toThrow();
  });

  it("keeps admin place updates partial and rejects invalid editable fields", () => {
    const update = UpdatePlaceInputSchema.parse({
      name_en: "Edited Place",
      cover_url: null,
      gallery_file_ids: [],
      recommended_reason_en: null
    });

    expect(update).toEqual({
      name_en: "Edited Place",
      cover_url: null,
      gallery_file_ids: [],
      recommended_reason_en: null
    });
    expect(update).not.toHaveProperty("name_zh");
    expect(update).not.toHaveProperty("_id");
    expect(apiPaths.admin.updatePlace("place_001")).toBe(
      "/admin/places/place_001"
    );

    expect(() =>
      UpdatePlaceInputSchema.parse({
        category_level_1: "service"
      })
    ).toThrow();
    expect(() =>
      UpdatePlaceInputSchema.parse({
        status: "deleted"
      })
    ).toThrow();
    expect(() =>
      UpdatePlaceInputSchema.parse({
        cover_url: "not-a-url"
      })
    ).toThrow();
    expect(() =>
      UpdatePlaceInputSchema.parse({
        location: {
          latitude: "30.6",
          longitude: 104.0
        }
      })
    ).toThrow();
  });

  it("keeps places list items limited to card browsing fields", () => {
    const item = PlaceListItemSchema.parse({
      _id: "place_001",
      name_zh: "桐梓林社区中心",
      name_en: "Tongzilin Community Center",
      cover_url: "https://example.com/place.jpg",
      category_level_1: "public-service",
      category_level_2: "community-center",
      short_address_zh: "成都市武侯区",
      short_address_en: "Wuhou District, Chengdu",
      summary_zh: "简介",
      summary_en: "Summary",
      tag_ids: ["service"],
      is_recommended: true,
      recommended_reason_zh: "推荐理由",
      recommended_reason_en: "Reason",
      supports_navigation: true,
      gallery_urls: ["https://example.com/gallery.jpg"],
      gallery_media: [
        {
          file_id: "cloud://place-001-1",
          cloud_path: "public/places/place_001/1.jpg",
          url: "https://example.com/gallery.jpg",
          alt_zh: "图集",
          alt_en: "Gallery"
        }
      ],
      address_zh: "成都",
      navigation: {
        latitude: 30.6,
        longitude: 104.0,
        name_zh: "桐梓林社区中心",
        name_en: "Tongzilin Community Center",
        address_zh: "成都",
        address_en: "Chengdu"
      }
    });

    expect(Object.keys(item).sort()).toEqual([
      "_id",
      "category_level_1",
      "category_level_2",
      "cover_url",
      "is_recommended",
      "name_en",
      "name_zh",
      "recommended_reason_en",
      "recommended_reason_zh",
      "short_address_en",
      "short_address_zh",
      "summary_en",
      "summary_zh",
      "supports_navigation",
      "tag_ids"
    ]);
    expect(item).not.toHaveProperty("gallery_urls");
    expect(item).not.toHaveProperty("gallery_media");
    expect(item).not.toHaveProperty("navigation");
    expect(item).not.toHaveProperty("address_zh");
  });

  it("rejects invalid places list sort values", () => {
    expect(() =>
      PlaceListQuerySchema.parse({
        sort: "latest"
      })
    ).toThrow();
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
    const successSchema = CreateApiSuccessSchema(PageResultSchema(PostSchema));
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
    expect(fileAsset.cloud_path).toBe(
      FILE_PATH_RULES.postImages + "post_001/1.jpg"
    );
    expect({
      locales: LocaleSchema.options,
      eventRegistrationStatuses: EVENT_REGISTRATION_STATUSES,
      apiErrorCodes: API_ERROR_CODES,
      filePaths: FILE_PATH_RULES
    }).toMatchSnapshot();
  });
});
