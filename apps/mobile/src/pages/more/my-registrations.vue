<script setup lang="ts">
import { onMounted, ref } from "vue";

import { mobileApi } from "@/api/client";

const registrations = ref<Array<any>>([]);

onMounted(async () => {
  const result = await mobileApi.events.myRegistrations();
  registrations.value = result.data;
});
</script>

<template>
  <view class="page">
    <view v-for="item in registrations" :key="item._id" class="card">
      <view>报名记录：{{ item._id }}</view>
      <view class="caption">状态：{{ item.registration_status }}</view>
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

.caption {
  color: #6b7280;
  margin-top: 10rpx;
}
</style>
