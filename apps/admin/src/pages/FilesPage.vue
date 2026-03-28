<script setup lang="ts">
import { computed } from "vue";

import { FILE_PATH_RULES } from "@/api/client";

const rows = computed(() =>
  Object.entries(FILE_PATH_RULES).map(([key, value]) => ({
    key,
    value
  }))
);
</script>

<template>
  <div class="page-card">
    <div class="page-header">
      <h2>文件回溯</h2>
      <el-tag type="success">路径规则已冻结</el-tag>
    </div>
    <el-table :data="rows">
      <el-table-column prop="key" label="规则名" min-width="180" />
      <el-table-column prop="value" label="路径前缀" min-width="260" />
    </el-table>
  </div>
</template>
