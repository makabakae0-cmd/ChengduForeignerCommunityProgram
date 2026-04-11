<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";

import { placesPagePaths } from "./navigation";

onLoad(() => {
  uni.redirectTo({
    url: placesPagePaths.recommended()
  });
});

const openRecommendedList = () => {
  uni.redirectTo({
    url: placesPagePaths.recommended()
  });
};
</script>

<template>
  <view class="page">
    <view class="redirect-card">
      推荐地点已并入列表页筛选。
      <button class="secondary" @click="openRecommendedList">打开推荐筛选列表</button>
    </view>
  </view>
</template>

<style scoped>
.page {
  padding: 24rpx;
  background: #f8fafc;
  min-height: 100vh;
}

.redirect-card {
  padding: 28rpx 24rpx;
  border-radius: 20rpx;
  background: #ffffff;
  color: #475569;
  line-height: 1.6;
}

.secondary {
  margin-top: 20rpx;
  background: #ccfbf1;
  color: #115e59;
}
</style>
