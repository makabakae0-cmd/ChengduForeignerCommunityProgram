# Chengdu Foreigner Community Program

基于 **uni-app（前端） + NestJS（后端）** 的社区服务小程序项目，聚焦以下核心能力：

- 首页信息流（帖子 + 活动卡片）
- 本地地标服务（详情、评价、导航、收藏）
- 社区活动（列表、详情、报名、核销、回顾）
- 社区互动（发帖、评论、点赞、分享）
- 公告与消息通知
- 管理员后台（活动管理、审核、数据统计）

---

## 1. 技术栈

### 前端（用户端）
- 框架：`uni-app`（Vue 3）
- 目标端：微信小程序（可扩展 H5）
- 状态管理：`pinia`
- 网络请求：`uni.request`（封装 request 模块）
- 国际化：`vue-i18n`
- UI：`uv-ui` 或 `uni-ui`（按团队习惯选一套）

### 后端
- 框架：`NestJS`
- 接口风格：`RESTful API`
- 数据库：`PostgreSQL`（推荐）
- ORM：`Prisma` 或 `TypeORM`（建议 Prisma）
- 缓存：`Redis`
- 鉴权：`JWT`
- 文档：`Swagger`

### 管理后台（建议）
- `Vue3 + Vite + Element Plus`
- 对接同一套 NestJS API

---

## 2. 推荐目录结构

```text
.
├── mobile/                    # uni-app 用户端
│   ├── src/
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   ├── event/
│   │   │   ├── landmark/
│   │   │   └── profile/
│   │   ├── components/
│   │   ├── stores/
│   │   ├── services/
│   │   ├── i18n/
│   │   └── utils/
│   └── package.json
│
├── server/                    # NestJS API
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── events/
│   │   │   ├── posts/
│   │   │   ├── landmarks/
│   │   │   ├── announcements/
│   │   │   └── notifications/
│   │   ├── common/
│   │   └── main.ts
│   ├── prisma/
│   └── package.json
│
├── admin/                     # 管理后台（可后续建立）
└── README.md
```

---

## 3. 当前分工：Event 模块（你负责）

你可以按下面顺序推进，先保证最小闭环：

1. 活动列表
- Tab：`全部 / 本周 / 即将开始 / 我的`
- 支持分页、状态筛选（报名中/进行中/已结束）

2. 活动详情
- 时间、地点、主办方、费用、名额、流程
- 状态显示（可报名/已满/已结束）

3. 活动报名
- 表单：姓名、电话
- 限制重复报名
- 并发下名额不超卖（事务）

4. 活动凭证
- 报名成功后生成二维码
- 后台扫码核销，核销幂等

5. 活动通知
- 报名成功提醒
- 开始前提醒
- 活动变更提醒

6. 活动回顾
- 活动结束后展示图文/视频回顾

---

## 4. Event 数据模型（建议）

### events
- `id` (uuid)
- `title`
- `cover_url`
- `start_time`
- `end_time`
- `location_name`
- `location_address`
- `organizer`
- `capacity_total`
- `fee`
- `status` (`open` | `ongoing` | `ended` | `cancelled`)
- `agenda_json`
- `content`
- `published`
- `created_at`
- `updated_at`

### event_registrations
- `id` (uuid)
- `event_id`
- `user_id`
- `name`
- `phone`
- `status` (`registered` | `checked_in` | `cancelled`)
- `voucher_token`
- `checked_in_at`
- `created_at`

### event_reviews
- `id` (uuid)
- `event_id`
- `content`
- `media_urls`
- `created_at`

### event_notifications
- `id` (uuid)
- `event_id`
- `user_id`
- `type` (`register_success` | `before_start` | `event_changed`)
- `payload_json`
- `read`
- `created_at`

---

## 5. Event API（MVP）

### 用户端
- `GET /events`：活动列表（分页 + tab/filter）
- `GET /events/:id`：活动详情
- `POST /events/:id/register`：活动报名
- `GET /me/event-registrations`：我的报名列表
- `GET /events/:id/voucher`：报名凭证二维码
- `GET /events/:id/review`：活动回顾

### 管理端
- `POST /admin/events`：创建活动
- `PATCH /admin/events/:id`：编辑活动
- `DELETE /admin/events/:id`：删除活动
- `GET /admin/events/:id/registrations`：报名名单
- `POST /admin/events/check-in`：扫码核销

---

## 6. 开发环境与启动

> 以下命令为推荐标准流程，实际以你们创建后的子项目脚本为准。

### 6.1 启动后端（NestJS）

```bash
cd server
npm install
npm run start:dev
```

如果使用 Prisma：

```bash
npx prisma migrate dev
npx prisma studio
```

### 6.2 启动前端（uni-app）

```bash
cd mobile
npm install
npm run dev:mp-weixin
```

`dev:mp-weixin` 会持续监听并输出微信小程序产物到仓库根目录的 `mp-weixin`。

微信开发者工具有两种导入方式：

- 推荐：直接导入 `mp-weixin`
- 也可以导入仓库根目录，根目录 `project.config.json` 已通过 `miniprogramRoot` 指向 `mp-weixin/`

当前开发阶段使用微信测试号 `touristappid`，暂不使用真实 AppID。打开项目后建议在开发者工具详情中勾选「不校验合法域名、web-view、TLS 版本以及 HTTPS 证书」，本地 API 联调才不会被域名校验拦截。

正式构建可执行：

```bash
cd mobile
npm run build:mp-weixin
```

对应生产构建目录为 `mobile/dist/build/mp-weixin`。

---

## 7. 环境变量建议

### server/.env

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/community
REDIS_URL=redis://localhost:6379
JWT_SECRET=replace_me
WECHAT_APPID=replace_me
WECHAT_SECRET=replace_me
```

### mobile/.env.development

```env
VITE_API_BASE_URL=http://127.0.0.1:3000/api
```

如果不配置该变量，前端默认也会请求 `http://127.0.0.1:3000/api`。真机预览或上线时不能使用 `127.0.0.1`，需要替换为已备案并配置到微信后台的 HTTPS 域名。

---

## 8. 关键业务规则（Event）

- 同一用户同一活动不可重复报名
- 已满员或已结束活动不可报名
- 报名与扣减名额必须在同一事务中
- 核销接口必须幂等，避免重复核销
- 活动变更需触发通知给已报名用户

---

## 9. 测试清单（交付前）

- 列表筛选与分页准确
- 详情字段完整并正确展示
- 并发报名不超卖
- 重复报名被正确拦截
- 凭证二维码可识别、可核销、不可重复核销
- 我的报名状态流转正确（待参加 -> 已结束/已核销）

---

## 10. 里程碑建议

### M1（1 周）
- Event 列表 + 详情 + 报名
- 管理端活动创建 + 名单查看

### M2（1 周）
- 凭证二维码 + 核销
- 活动提醒通知

### M3（1 周）
- 活动回顾
- 首页活动卡片联动 + 数据优化

---

## 11. License

本项目遵循仓库中的 [LICENSE](./LICENSE)。
