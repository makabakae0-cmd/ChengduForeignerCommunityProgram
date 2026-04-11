<script setup lang="ts">
defineProps<{
  variant: "loading" | "empty" | "error";
  text: string;
}>();
</script>

<template>
  <view class="status-card" :class="variant">
    {{ text }}
  </view>
</template>

<style scoped>
.status-card {
  padding: 28rpx 24rpx;
  border-radius: 24rpx;
  background: #f1f5f9;
  color: #475569;
  line-height: 1.6;
}

.status-card.error {
  background: #fee2e2;
  color: #991b1b;
}
</style>
