<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import type { PlaceDetail } from "@community-map/shared";

import { mobileApi } from "@/api/client";
import SectionPanel from "@/components/SectionPanel.vue";
import { pickLocalized, useAppStore } from "@/stores/app-store";

const { state } = useAppStore();
const place = ref<PlaceDetail | null>(null);
const loading = ref(true);
const error = ref("");

onLoad(async (query) => {
  if (!query?.id) {
    loading.value = false;
    error.value = "缺少地点 ID";
    return;
  }

  try {
    const result = await mobileApi.places.detail(String(query.id));
    place.value = result.data;
  } catch (loadError) {
    error.value = loadError instanceof Error ? loadError.message : "详情加载失败";
  } finally {
    loading.value = false;
  }
});

const openNavigation = () => {
  if (!place.value) {
    return;
  }

  uni.openLocation({
    latitude: place.value.navigation.latitude,
    longitude: place.value.navigation.longitude,
    name: pickLocalized(state.locale, place.value.navigation.name_zh, place.value.navigation.name_en),
    address: pickLocalized(
      state.locale,
      place.value.navigation.address_zh,
      place.value.navigation.address_en
    ),
    scale: 16,
    fail: () => {
      uni.showToast({
        title: "打开导航失败",
        icon: "none"
      });
    }
  });
};

const openMapPosition = () => {
  if (!place.value) {
    return;
  }

  uni.navigateTo({
    url: `/pages/places/map?id=${place.value._id}`
  });
};

const favoritePlaceholder = () => {
  uni.showToast({
    title: "收藏能力将在后续版本接入",
    icon: "none"
  });
};

const sharePlaceholder = () => {
  uni.showShareMenu?.({
    menus: ["shareAppMessage", "shareTimeline"]
  });

  uni.showToast({
    title: "分享入口已预留",
    icon: "none"
  });
};
</script>

<template>
  <view class="page">
    <view v-if="loading" class="status-card">详情加载中...</view>
    <view v-else-if="error" class="status-card error">{{ error }}</view>
    <SectionPanel
      v-else-if="place"
      :title="pickLocalized(state.locale, place.name_zh, place.name_en)"
      :subtitle="`${place.category_level_1} / ${place.category_level_2}`"
    >
      <view v-if="place.cover_url" class="hero-image">{{ place.cover_url }}</view>
      <view class="tag-row">
        <text v-for="tag in place.tag_ids" :key="tag" class="tag">#{{ tag }}</text>
      </view>
      <view class="line">
        {{ pickLocalized(state.locale, place.address_zh, place.address_en) }}
      </view>
      <view class="line">
        营业时间：{{
          pickLocalized(state.locale, place.business_hours_zh, place.business_hours_en)
        }}
      </view>
      <view class="line">{{
        pickLocalized(state.locale, place.intro_zh, place.intro_en)
      }}</view>
      <view
        v-if="place.is_recommended"
        class="recommendation"
      >
        {{
          pickLocalized(
            state.locale,
            place.recommended_reason_zh ?? "推荐地点",
            place.recommended_reason_en ?? "Recommended place"
          )
        }}
      </view>
      <view v-if="place.gallery_urls.length" class="gallery">
        <view
          v-for="galleryUrl in place.gallery_urls"
          :key="galleryUrl"
          class="gallery-item"
        >
          {{ galleryUrl }}
        </view>
      </view>
      <view class="button-row">
        <button class="primary" @click="openNavigation">发起导航</button>
        <button class="secondary" @click="openMapPosition">查看地图位置</button>
      </view>
      <view class="button-row">
        <button class="ghost" @click="favoritePlaceholder">收藏入口</button>
        <button class="ghost" @click="sharePlaceholder">分享入口</button>
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

.status-card {
  padding: 28rpx 24rpx;
  border-radius: 24rpx;
  background: #ffffff;
  color: #475569;
}

.status-card.error {
  background: #fee2e2;
  color: #991b1b;
}

.hero-image,
.gallery-item {
  margin-bottom: 16rpx;
  padding: 24rpx;
  border-radius: 20rpx;
  background: #e2e8f0;
  color: #334155;
  word-break: break-all;
}

.tag-row,
.button-row {
  display: flex;
  gap: 16rpx;
  flex-wrap: wrap;
  margin-bottom: 16rpx;
}

.tag {
  padding: 6rpx 14rpx;
  border-radius: 999rpx;
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 22rpx;
}

.line {
  margin-bottom: 16rpx;
  line-height: 1.7;
}

.recommendation {
  margin-bottom: 16rpx;
  padding: 20rpx;
  border-radius: 20rpx;
  background: #ecfccb;
  color: #3f6212;
}

.gallery {
  margin-bottom: 16rpx;
}

.primary {
  background: #0f766e;
  color: white;
}

.secondary {
  background: #ccfbf1;
  color: #115e59;
}

.ghost {
  background: #e2e8f0;
  color: #334155;
}
</style>
