<script setup lang="ts">
import { onMounted, ref } from "vue";

import { mobileApi } from "@/api/client";
import SectionPanel from "@/components/SectionPanel.vue";
import { pickLocalized, useAppStore } from "@/stores/app-store";

const { state } = useAppStore();
const places = ref<Array<any>>([]);

const load = async () => {
  const result = await mobileApi.places.list();
  places.value = result.data.items;
};

const openDetail = (id: string) => {
  uni.navigateTo({
    url: `/pages/places/detail?id=${id}`
  });
};

const openMap = () => {
  uni.navigateTo({
    url: "/pages/places/map"
  });
};

onMounted(load);
</script>

<template>
  <view class="page">
    <SectionPanel title="Places" subtitle="地点列表、详情和地图入口已预留">
      <button class="primary" @click="openMap">查看地图占位</button>
      <view v-for="place in places" :key="place._id" class="card" @click="openDetail(place._id)">
        <view class="card-title">{{ pickLocalized(state.locale, place.name_zh, place.name_en) }}</view>
        <view class="card-text">{{ pickLocalized(state.locale, place.address_zh, place.address_en) }}</view>
      </view>
    </SectionPanel>
  </view>
</template>

<style scoped>
.page {
  padding: 24rpx;
}

.primary {
  margin-bottom: 20rpx;
  background: #0f766e;
  color: white;
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
  margin-top: 10rpx;
  color: #6b7280;
}
</style>
