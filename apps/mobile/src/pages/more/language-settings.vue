<script setup lang="ts">
import { computed } from "vue";

import { useAppStore } from "@/stores/app-store";

const { state, setLocale } = useAppStore();
const isZh = computed(() => state.locale === "zh");
const onToggleLocale = (value: boolean) => {
  setLocale(value ? "zh" : "en");
};
</script>

<template>
  <view class="page">
    <view class="title">语言设置</view>
    <view class="caption">正式内容使用双语字段，当前页面直接控制全局 locale。</view>
    <switch :checked="isZh" @change="onToggleLocale(($event as any).detail.value)" />
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

.caption {
  margin: 16rpx 0 24rpx;
  color: #6b7280;
}
</style>
