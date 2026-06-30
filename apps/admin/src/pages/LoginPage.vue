<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

import { adminApi } from "@/api/client";

const router = useRouter();
const loading = ref(false);
const session = ref<string>("");
const form = reactive({
  mock_user_id: "user_001",
  preferred_language: "zh" as "zh" | "en"
});

const submit = async () => {
  loading.value = true;
  try {
    const result = await adminApi.auth.login(form);
    session.value = `${result.data.user.nickname} / ${result.data.user.role_flags.join(", ")}`;
    router.push("/events");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div
    style="min-height: 100vh; display: grid; place-items: center; background: linear-gradient(135deg, #dbeafe, #f8fafc 55%, #dcfce7)"
  >
    <div class="page-card" style="width: 420px">
      <h2 style="margin-top: 0">后台登录占位</h2>
      <p style="color: #6b7280">Phase 1 使用 mock 登录，固定后续鉴权接口位置。</p>
      <el-form label-position="top">
        <el-form-item label="Mock 用户 ID">
          <el-input v-model="form.mock_user_id" />
        </el-form-item>
        <el-form-item label="语言">
          <el-select v-model="form.preferred_language" style="width: 100%">
            <el-option label="中文" value="zh" />
            <el-option label="English" value="en" />
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" :loading="loading" @click="submit">进入后台</el-button>
      <div v-if="session" style="margin-top: 16px; color: #374151">当前会话：{{ session }}</div>
    </div>
  </div>
</template>
