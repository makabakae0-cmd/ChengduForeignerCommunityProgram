<template>
  <view class="page">
    <view class="hero">
      <text class="hero-title">Chengdu Foreigner Community</text>
      <text class="hero-subtitle">uni-app + NestJS MVP</text>
    </view>

    <view class="card" @click="goEventPage">
      <text class="card-title">社区活动</text>
      <text class="card-desc">查看活动列表、活动详情与报名入口（MVP页面）</text>
      <text class="card-cta">进入活动页</text>
    </view>
  </view>
</template>

<script setup lang="ts">
function goEventPage() {
  uni.navigateTo({ url: '/pages/event/list' });
}
</script>

<style scoped>
.page {
  padding: 24rpx;
}

.hero {
  background: linear-gradient(140deg, #0f172a, #1d4ed8);
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
}

.hero-title {
  color: #ffffff;
  font-size: 36rpx;
  font-weight: 700;
  display: block;
}

.hero-subtitle {
  color: #dbeafe;
  font-size: 26rpx;
  margin-top: 10rpx;
  display: block;
}

.card {
  background: #ffffff;
  border-radius: 24rpx;
  padding: 28rpx;
}

.card-title {
  display: block;
  font-size: 32rpx;
  font-weight: 700;
}

.card-desc {
  display: block;
  margin-top: 12rpx;
  color: #4b5563;
}

.card-cta {
  display: inline-block;
  margin-top: 20rpx;
  color: #1d4ed8;
  font-weight: 600;
}
</style>
