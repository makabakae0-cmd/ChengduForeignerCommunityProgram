---
name: project-overview-doc
overview: 新建一个项目级 Markdown 文档，集中整理项目现状、架构差异、已完成内容、风险和后续需要修改/跟进的部分。文档会基于当前 main 工作区，并补充 upstream/feat/places-and-backend 的完整 monorepo 差异。
todos:
  - id: create-docs-file
    content: 创建 docs/project-overview-and-next-steps.md 并写入项目总览
    status: completed
  - id: include-current-main
    content: 整理当前 main 的 mobile/server 实际实现与缺口
    status: completed
  - id: include-upstream-diff
    content: 整理 upstream/feat/places-and-backend 的 monorepo 差异和意义
    status: completed
  - id: list-next-parts
    content: 按优先级列出后续需要修改和跟进的 parts
    status: completed
isProject: false
---

# 项目总览文档整理计划

## 目标文件
- 新建 `[docs/project-overview-and-next-steps.md](docs/project-overview-and-next-steps.md)`。
- 如果当前没有 `[docs/](docs/)` 目录，将一并创建。

## 文档内容结构
- 项目定位：整理 CFCP 是成都外籍社区服务小程序，覆盖首页信息流、活动、地标、社区互动、通知和后台。
- 当前 main 实际结构：说明 `[mobile/](mobile/)` + `[server/](server/)` 的现状，列出核心源码入口。
- upstream 分支差异：说明 `upstream/feat/places-and-backend` 中的 `[apps/](apps/)`、`[packages/shared/](packages/shared/)`、`[apps/api/](apps/api/)`、`[apps/admin/](apps/admin/)`、测试和文档体系。
- 已完成内容：按 mobile、server、文档、upstream monorepo 分组整理。
- 未完成和风险：重点列出架构分裂、报名闭环、鉴权、Places/Discover/Admin、环境配置、测试和 CloudBase 差异。
- 后续需要修改/跟进的 Part：按优先级列清楚，包括合并/统一架构、报名 API、前端报名联调、用户体系、Places/Admin 补齐、工程配置和测试。

## 信息来源
- 当前 main：`[README.md](README.md)`、`[mobile/src/pages/event/list.vue](mobile/src/pages/event/list.vue)`、`[mobile/src/services/event.client.ts](mobile/src/services/event.client.ts)`、`[server/src/modules/events/events.service.ts](server/src/modules/events/events.service.ts)`、`[server/prisma/schema.prisma](server/prisma/schema.prisma)`。
- 计划与总结：`[weekly-plan-mvp-report.md](weekly-plan-mvp-report.md)`、`[emma-weekly-plan.md](emma-weekly-plan.md)`、`[work-summary-week1-emma.md](work-summary-week1-emma.md)`。
- upstream 差异：`upstream/feat/places-and-backend` 的 diff/stat 摘要，重点是 monorepo、shared 契约、Koa API、Vue admin、places 相关实现。

## 文档风格
- 使用中文。
- 用表格和短段落组织，便于后续团队直接阅读。
- 明确区分“当前 main 已有”和“upstream 分支已有”。
- 后续事项使用优先级分组：P0 必须先做、P1 下一阶段、P2 后续增强。

## 不做的事
- 不修改业务代码。
- 不合并 upstream 分支。
- 不改 package、配置或依赖。
- 不删除或重命名现有文件。