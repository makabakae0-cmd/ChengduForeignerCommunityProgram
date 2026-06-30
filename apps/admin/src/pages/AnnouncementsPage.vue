<script setup lang="ts">
import { onMounted, ref } from "vue";

import { adminApi } from "@/api/client";

const loading = ref(false);
const announcements = ref<Array<any>>([]);

const load = async () => {
  loading.value = true;
  try {
    const result = await adminApi.announcements.list();
    announcements.value = result.data.items;
  } finally {
    loading.value = false;
  }
};

onMounted(load);
</script>

<template>
  <div class="page-card">
    <div class="page-header">
      <h2>公告管理</h2>
      <el-alert
        title="首版先冻结公告数据结构与读取接口，新增/编辑接口留待下一阶段。"
        type="info"
        :closable="false"
      />
    </div>
    <el-table :data="announcements" v-loading="loading">
      <el-table-column prop="title_zh" label="中文标题" min-width="220" />
      <el-table-column prop="title_en" label="英文标题" min-width="220" />
      <el-table-column prop="published_at" label="发布时间" min-width="180" />
    </el-table>
  </div>
</template>
