<script setup lang="ts">
import { onMounted, ref } from "vue";

import { mobileApi } from "@/api/client";
import SectionPanel from "@/components/SectionPanel.vue";
import { pickLocalized, useAppStore } from "@/stores/app-store";

const { state } = useAppStore();
const events = ref<Array<any>>([]);

const load = async () => {
  const result = await mobileApi.events.list();
  events.value = result.data.items;
};

const openDetail = (id: string) => {
  uni.navigateTo({
    url: `/pages/events/detail?id=${id}`
  });
};

onMounted(load);
</script>

<template>
  <view class="page">
    <SectionPanel title="Events" subtitle="活动列表和详情页已可独立联调">
      <view v-for="event in events" :key="event._id" class="card" @click="openDetail(event._id)">
        <view class="card-title">{{ pickLocalized(state.locale, event.title_zh, event.title_en) }}</view>
        <view class="card-text">{{ pickLocalized(state.locale, event.summary_zh, event.summary_en) }}</view>
      </view>
    </SectionPanel>
  </view>
</template>

<style scoped>
.page {
  padding: 24rpx;
}

.card {
  padding: 24rpx 0;
  border-bottom: 1rpx solid #e5e7eb;
}

.card-title {
  font-size: 32rpx;
  font-weight: 600;
}

.card-text {
  margin-top: 12rpx;
  color: #6b7280;
}
</style>
