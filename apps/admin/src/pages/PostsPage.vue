<script setup lang="ts">
import { onMounted, ref } from "vue";

import { adminApi } from "@/api/client";

const loading = ref(false);
const posts = ref<Array<any>>([]);

const load = async () => {
  loading.value = true;
  try {
    const result = await adminApi.discover.listPosts();
    posts.value = result.data.items;
  } finally {
    loading.value = false;
  }
};

const hidePost = async (id: string) => {
  await adminApi.admin.moderatePost(id, { review_status: "hidden" });
  await load();
};

onMounted(load);
</script>

<template>
  <div class="page-card">
    <div class="page-header">
      <h2>帖子治理</h2>
      <el-tag type="warning">首版提供列表与治理动作占位</el-tag>
    </div>
    <el-table :data="posts" v-loading="loading">
      <el-table-column prop="title" label="标题" min-width="220" />
      <el-table-column prop="language" label="语言" width="100" />
      <el-table-column prop="review_status" label="治理状态" width="140" />
      <el-table-column label="操作" width="140">
        <template #default="{ row }">
          <el-button size="small" @click="hidePost(row._id)">隐藏</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
