<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

import { mobileApi } from "@/api/client";
import SectionPanel from "@/components/SectionPanel.vue";
import { pickLocalized, useAppStore } from "@/stores/app-store";

const { state } = useAppStore();
const place = ref<any | null>(null);

onLoad(async (query) => {
  if (!query?.id) {
    return;
  }
  const result = await mobileApi.places.detail(String(query.id));
  place.value = result.data;
});

const openNavigation = () => {
  uni.showToast({
    title: "后续接入腾讯地图导航",
    icon: "none"
  });
};
</script>

<template>
  <view class="page" v-if="place">
    <SectionPanel :title="pickLocalized(state.locale, place.name_zh, place.name_en)">
      <view class="line">{{ pickLocalized(state.locale, place.address_zh, place.address_en) }}</view>
      <view class="line">{{ pickLocalized(state.locale, place.intro_zh, place.intro_en) }}</view>
      <button class="primary" @click="openNavigation">导航占位</button>
    </SectionPanel>
  </view>
</template>

<style scoped>
.page {
  padding: 24rpx;
}

.line {
  margin-bottom: 16rpx;
  line-height: 1.7;
}

.primary {
  margin-top: 20rpx;
  background: #0f766e;
  color: white;
}
</style>
