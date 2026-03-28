<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

import { adminApi } from "@/api/client";

const loading = ref(false);
const places = ref<Array<any>>([]);
const form = reactive({
  name_zh: "新增地点草稿",
  name_en: "New Draft Place",
  category_level_1: "service",
  category_level_2: "community",
  address_zh: "桐梓林待补充地址",
  address_en: "Address pending",
  location: { latitude: 30.615, longitude: 104.062 },
  business_hours_zh: "待补充",
  business_hours_en: "Pending",
  intro_zh: "待补充简介",
  intro_en: "Introduction pending"
});

const load = async () => {
  loading.value = true;
  try {
    const result = await adminApi.places.list();
    places.value = result.data.items;
  } finally {
    loading.value = false;
  }
};

const createPlace = async () => {
  await adminApi.admin.createPlace(form);
  await load();
};

onMounted(load);
</script>

<template>
  <div class="page-card">
    <div class="page-header">
      <h2>地点管理</h2>
      <el-button type="primary" @click="createPlace">新增地点</el-button>
    </div>
    <el-table :data="places" v-loading="loading">
      <el-table-column prop="name_zh" label="中文名" min-width="180" />
      <el-table-column prop="name_en" label="英文名" min-width="180" />
      <el-table-column prop="category_level_1" label="一级分类" width="140" />
      <el-table-column prop="status" label="状态" width="120" />
    </el-table>
  </div>
</template>
