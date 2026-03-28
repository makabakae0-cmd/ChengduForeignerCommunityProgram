<script setup lang="ts">
import { onMounted, ref } from "vue";

import { mobileApi } from "@/api/client";

const markers = ref<Array<any>>([]);

onMounted(async () => {
  const result = await mobileApi.places.mapMarkers();
  markers.value = result.data;
});
</script>

<template>
  <view class="page">
    <view class="title">地图占位页</view>
    <view class="subtitle">下一阶段接入腾讯地图 SDK，这里先固定 marker 数据接口。</view>
    <view v-for="marker in markers" :key="marker._id" class="card">
      <view>{{ marker.name_zh }} / {{ marker.name_en }}</view>
      <view class="caption">{{ marker.location.latitude }}, {{ marker.location.longitude }}</view>
    </view>
  </view>
</template>

<style scoped>
.page {
  padding: 24rpx;
}

.title {
  font-size: 36rpx;
  font-weight: 700;
}

.subtitle {
  color: #6b7280;
  margin-top: 12rpx;
  margin-bottom: 24rpx;
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
