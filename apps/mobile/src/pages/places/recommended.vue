<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import type { PlaceListItem } from "@community-map/shared";

import { mobileApi } from "@/api/client";
import SectionPanel from "@/components/SectionPanel.vue";
import { pickLocalized, useAppStore } from "@/stores/app-store";

const { state } = useAppStore();
const places = ref<PlaceListItem[]>([]);
const loading = ref(true);
const error = ref("");

const load = async () => {
  loading.value = true;
  error.value = "";

  try {
    const result = await mobileApi.places.list({
      communityId: state.communityId,
      recommended: true,
      sort: "recommended"
    });
    places.value = result.data.items;
  } catch (loadError) {
    error.value = loadError instanceof Error ? loadError.message : "推荐地点加载失败";
  } finally {
    loading.value = false;
  }
};

const openDetail = (id: string) => {
  uni.navigateTo({
    url: `/pages/places/detail?id=${id}`
  });
};

const openMap = () => {
  uni.switchTab({
    url: "/pages/places/map"
  });
};

onLoad(load);
</script>

<template>
  <view class="page">
    <SectionPanel title="Recommended Places" subtitle="承接首页与模块内推荐入口的独立列表页">
      <button class="secondary" @click="openMap">回到地图主页</button>

      <view v-if="loading" class="status-card">推荐地点加载中...</view>
      <view v-else-if="error" class="status-card error">{{ error }}</view>
      <view v-else-if="places.length === 0" class="status-card">暂无推荐地点。</view>
      <view
        v-else
        v-for="place in places"
        :key="place._id"
        class="card"
        @click="openDetail(place._id)"
      >
        <view class="card-title">
          {{ pickLocalized(state.locale, place.name_zh, place.name_en) }}
        </view>
        <view class="card-meta">
          {{ pickLocalized(state.locale, place.short_address_zh, place.short_address_en) }}
        </view>
        <view class="card-text">
          {{
            pickLocalized(
              state.locale,
              place.recommended_reason_zh ?? place.summary_zh,
              place.recommended_reason_en ?? place.summary_en
            )
          }}
        </view>
      </view>
    </SectionPanel>
  </view>
</template>

<style scoped>
.page {
  padding: 24rpx;
  background: #f8fafc;
  min-height: 100vh;
}

.secondary {
  margin-bottom: 16rpx;
  background: #ccfbf1;
  color: #115e59;
}

.status-card {
  padding: 28rpx 24rpx;
  border-radius: 20rpx;
  background: #ffffff;
  color: #475569;
}

.status-card.error {
  background: #fee2e2;
  color: #991b1b;
}

.card {
  margin-top: 16rpx;
  background: #ffffff;
  border-radius: 22rpx;
  padding: 24rpx;
}

.card-title {
  font-size: 32rpx;
  font-weight: 600;
}

.card-meta,
.card-text {
  margin-top: 10rpx;
  color: #64748b;
}
</style>
