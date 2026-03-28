import type {
  Announcement,
  Comment,
  Event,
  EventRegistration,
  EventTicket,
  FileAsset,
  Notification,
  Place,
  Post,
  User
} from "../types/entities";

export interface MockDataset {
  users: User[];
  events: Event[];
  registrations: EventRegistration[];
  tickets: EventTicket[];
  places: Place[];
  posts: Post[];
  comments: Comment[];
  announcements: Announcement[];
  notifications: Notification[];
  fileAssets: FileAsset[];
}

export const createMockDataset = (): MockDataset => ({
  users: [
    {
      _id: "user_001",
      openid: "openid_001",
      unionid: "unionid_001",
      nickname: "Jerry",
      avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      phone: "13800000000",
      preferred_language: "zh",
      role_flags: ["user", "community_admin", "system_admin"],
      status: "active"
    },
    {
      _id: "user_002",
      openid: "openid_002",
      unionid: "unionid_002",
      nickname: "Emma",
      avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      phone: "13900000000",
      preferred_language: "en",
      role_flags: ["user", "organizer"],
      status: "active"
    }
  ],
  events: [
    {
      _id: "event_001",
      community_id: "tongzilin",
      title_zh: "周末国际邻里早午餐",
      title_en: "Weekend Neighborhood Brunch",
      summary_zh: "面向桐梓林新老居民的轻社交活动。",
      summary_en: "A casual meet-up for old and new Tongzilin neighbors.",
      content_zh: "现场提供轻食、社区介绍和志愿者报名入口。",
      content_en: "Light food, community overview, and volunteer onboarding.",
      cover_file_id: "cloud://event-cover-001",
      cover_cloud_path: "public/events/event_001/cover.jpg",
      cover_url: "https://example.com/public/events/event_001/cover.jpg",
      place_id: "place_001",
      address_text: "桐梓林社区中心一楼活动厅",
      location: {
        latitude: 30.6151,
        longitude: 104.0628
      },
      start_time: "2026-04-02T10:00:00+08:00",
      end_time: "2026-04-02T12:00:00+08:00",
      signup_deadline: "2026-04-01T18:00:00+08:00",
      capacity: 60,
      organizer_user_id: "user_002",
      review_status: "approved",
      publish_status: "published"
    }
  ],
  registrations: [
    {
      _id: "reg_001",
      event_id: "event_001",
      user_id: "user_001",
      contact_name: "Jerry",
      contact_phone: "13800000000",
      attendee_count: 2,
      registration_status: "confirmed",
      ticket_id: "ticket_001",
      source_channel: "miniapp"
    }
  ],
  tickets: [
    {
      _id: "ticket_001",
      registration_id: "reg_001",
      ticket_code: "TZL-20260402-001",
      qr_file_id: "cloud://private-ticket-001",
      qr_cloud_path: "private/tickets/event_001/ticket_001.png",
      visibility: "private",
      status: "valid",
      issued_at: "2026-03-28T10:00:00+08:00",
      used_at: null
    }
  ],
  places: [
    {
      _id: "place_001",
      community_id: "tongzilin",
      name_zh: "桐梓林社区中心",
      name_en: "Tongzilin Community Center",
      category_level_1: "public-service",
      category_level_2: "community-center",
      address_zh: "成都市武侯区桐梓林北路 88 号",
      address_en: "No. 88, Tongzilin North Road, Wuhou District, Chengdu",
      location: {
        latitude: 30.615,
        longitude: 104.0625
      },
      tencent_map_poi_id: "poi_001",
      business_hours_zh: "周一至周日 09:00-18:00",
      business_hours_en: "Mon-Sun 09:00-18:00",
      intro_zh: "社区活动、公告展示和居民服务的主要线下节点。",
      intro_en: "Main offline hub for events, announcements, and resident services.",
      gallery_file_ids: ["cloud://place-001-1"],
      gallery_urls: ["https://example.com/public/places/place_001/1.jpg"],
      status: "published"
    },
    {
      _id: "place_002",
      community_id: "tongzilin",
      name_zh: "国际友好咖啡馆",
      name_en: "Global Corner Cafe",
      category_level_1: "food",
      category_level_2: "cafe",
      address_zh: "成都市武侯区桐梓林南路 26 号",
      address_en: "No. 26, Tongzilin South Road, Wuhou District, Chengdu",
      location: {
        latitude: 30.6137,
        longitude: 104.0609
      },
      tencent_map_poi_id: "poi_002",
      business_hours_zh: "周一至周日 08:00-22:00",
      business_hours_en: "Mon-Sun 08:00-22:00",
      intro_zh: "适合国际居民会面和英语角的咖啡空间。",
      intro_en: "A cafe often used for meet-ups and language exchange.",
      gallery_file_ids: ["cloud://place-002-1"],
      gallery_urls: ["https://example.com/public/places/place_002/1.jpg"],
      status: "published"
    }
  ],
  posts: [
    {
      _id: "post_001",
      author_user_id: "user_001",
      community_id: "tongzilin",
      title: "周边哪里能买到合适的婴儿用品？",
      content: "刚搬来桐梓林，想找靠谱的母婴店或药店，欢迎推荐。",
      language: "zh",
      tag_ids: ["family", "help"],
      location_text: "桐梓林地铁站附近",
      image_file_ids: [],
      image_urls: [],
      status: "visible",
      review_status: "visible"
    },
    {
      _id: "post_002",
      author_user_id: "user_002",
      community_id: "tongzilin",
      title: "Any tennis groups in Tongzilin?",
      content: "Looking for a weekend tennis group within 20 minutes from Tongzilin.",
      language: "en",
      tag_ids: ["sports", "social"],
      location_text: null,
      image_file_ids: ["cloud://post-002-1"],
      image_urls: ["https://example.com/public/posts/post_002/1.jpg"],
      status: "visible",
      review_status: "visible"
    }
  ],
  comments: [
    {
      _id: "comment_001",
      post_id: "post_001",
      author_user_id: "user_002",
      content: "社区中心附近有一家口碑不错的母婴店。",
      language: "zh",
      created_at: "2026-03-28T09:30:00+08:00"
    }
  ],
  announcements: [
    {
      _id: "announcement_001",
      community_id: "tongzilin",
      title_zh: "清明节期间社区开放时间调整",
      title_en: "Community Center Hours for Qingming Festival",
      summary_zh: "4 月 4 日至 4 月 6 日部分服务时段调整。",
      summary_en: "Some resident services will operate on adjusted hours from Apr 4 to Apr 6.",
      content_zh: "请提前预约线下窗口服务，活动报名不受影响。",
      content_en: "Please reserve offline service slots in advance. Event registrations stay open.",
      cover_file_id: "cloud://announcement-cover-001",
      cover_url: "https://example.com/public/announcements/announcement_001/cover.jpg",
      status: "published",
      published_at: "2026-03-26T12:00:00+08:00"
    }
  ],
  notifications: [
    {
      _id: "notification_001",
      user_id: "user_001",
      title: "报名成功",
      body: "你已成功报名周末国际邻里早午餐。",
      status: "unread",
      created_at: "2026-03-28T10:05:00+08:00"
    }
  ],
  fileAssets: [
    {
      _id: "file_001",
      file_id: "cloud://event-cover-001",
      cloud_path: "public/events/event_001/cover.jpg",
      visibility: "public",
      biz_type: "event_cover",
      biz_id: "event_001",
      uploaded_by: "user_002",
      status: "active"
    }
  ]
});
