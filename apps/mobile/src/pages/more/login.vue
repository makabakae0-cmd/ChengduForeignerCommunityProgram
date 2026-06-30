<script setup lang="ts">
import { ref } from "vue";

import { mobileApi } from "@/api/client";

const session = ref("");

const login = async () => {
  const result = await mobileApi.auth.login({
    mock_user_id: "user_001",
    preferred_language: "zh"
  });
  session.value = `${result.data.user.nickname} / ${result.data.token}`;
};
</script>

<template>
  <view class="page">
    <button class="primary" @click="login">Mock 登录</button>
    <view v-if="session" class="caption">{{ session }}</view>
  </view>
</template>

<style scoped>
.page {
  padding: 24rpx;
}

.primary {
  background: #111827;
  color: white;
}

.caption {
  margin-top: 20rpx;
  color: #6b7280;
}
</style>
