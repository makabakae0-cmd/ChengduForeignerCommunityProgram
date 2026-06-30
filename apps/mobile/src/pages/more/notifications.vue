<script setup lang="ts">
import { onMounted, ref } from "vue";

import { mobileApi } from "@/api/client";

const notifications = ref<Array<any>>([]);

const load = async () => {
  const result = await mobileApi.notifications.list();
  notifications.value = result.data;
};

const markRead = async (id: string) => {
  await mobileApi.notifications.markRead(id);
  await load();
};

onMounted(load);
</script>

<template>
  <view class="page">
    <view v-for="item in notifications" :key="item._id" class="card">
      <view class="title">{{ item.title }}</view>
      <view class="body">{{ item.body }}</view>
      <button size="mini" @click="markRead(item._id)">标记已读</button>
    </view>
  </view>
</template>

<style scoped>
.page {
  padding: 24rpx;
}

.card {
  background: white;
  border-radius: 20rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
}

.title {
  font-weight: 600;
}

.body {
  margin-top: 8rpx;
  color: #6b7280;
}
</style>
