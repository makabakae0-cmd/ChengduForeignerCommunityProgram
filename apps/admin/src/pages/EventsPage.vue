<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

import { adminApi } from "@/api/client";

const loading = ref(false);
const events = ref<Array<any>>([]);
const createForm = reactive({
  title_zh: "新活动草稿",
  title_en: "New Draft Event",
  summary_zh: "待补充简介",
  summary_en: "Summary pending",
  content_zh: "待补充正文",
  content_en: "Content pending",
  address_text: "桐梓林社区中心",
  location: { latitude: 30.615, longitude: 104.062 },
  start_time: "2026-04-10T10:00:00+08:00",
  end_time: "2026-04-10T12:00:00+08:00",
  signup_deadline: "2026-04-09T18:00:00+08:00",
  capacity: 30
});

const load = async () => {
  loading.value = true;
  try {
    const result = await adminApi.events.list();
    events.value = result.data.items;
  } finally {
    loading.value = false;
  }
};

const createDraft = async () => {
  await adminApi.admin.createEvent(createForm);
  await load();
};

const approve = async (id: string) => {
  await adminApi.admin.reviewEvent(id, {
    review_status: "approved",
    publish_status: "published"
  });
  await load();
};

onMounted(load);
</script>

<template>
  <div class="page-card">
    <div class="page-header">
      <h2>活动管理</h2>
      <el-button type="primary" @click="createDraft">新建草稿</el-button>
    </div>
    <el-table :data="events" v-loading="loading">
      <el-table-column prop="title_zh" label="中文标题" min-width="180" />
      <el-table-column prop="title_en" label="英文标题" min-width="180" />
      <el-table-column prop="review_status" label="审核状态" width="140" />
      <el-table-column prop="publish_status" label="发布状态" width="140" />
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button size="small" @click="approve(row._id)">通过并发布</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
