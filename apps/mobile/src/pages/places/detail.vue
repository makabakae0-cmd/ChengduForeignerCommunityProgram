<script setup lang="ts">
import { computed, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import type { PlaceDetail } from "@community-map/shared";

import { mobileApi } from "@/api/client";
import AsyncStateCard from "@/components/AsyncStateCard.vue";
import SectionPanel from "@/components/SectionPanel.vue";
import { pickLocalized, useAppStore } from "@/stores/app-store";
import { getPlacesCopy } from "./copy";
import { placesPagePaths } from "./navigation";
import { usePlaceAsyncState } from "./usePlaceAsyncState";

const { state } = useAppStore();
const place = ref<PlaceDetail | null>(null);
const { loading, error, run, setError } = usePlaceAsyncState();
const detailCopy = computed(() => getPlacesCopy(state.locale, "detail"));

onLoad(async (query) => {
  if (!query?.id) {
    setError(detailCopy.value.missingId);
    return;
  }

  const result = await run(
    () => mobileApi.places.detail(String(query.id)),
    detailCopy.value.error
  );

  if (result) {
    place.value = result.data;
  }
});

const openNavigation = () => {
  if (!place.value) {
    return;
  }

  uni.openLocation({
    latitude: place.value.navigation.latitude,
    longitude: place.value.navigation.longitude,
    name: pickLocalized(
      state.locale,
      place.value.navigation.name_zh,
      place.value.navigation.name_en
    ),
    address: pickLocalized(
      state.locale,
      place.value.navigation.address_zh,
      place.value.navigation.address_en
    ),
    scale: 16,
    fail: () => {
      uni.showToast({
        title: detailCopy.value.navigationFailed,
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
    url: placesPagePaths.map(place.value._id)
  });
};

const favoritePlaceholder = () => {
  uni.showToast({
    title: detailCopy.value.favoritePending,
    icon: "none"
  });
};

const sharePlaceholder = () => {
  uni.showShareMenu?.({
    menus: ["shareAppMessage", "shareTimeline"]
  });

  uni.showToast({
    title: detailCopy.value.sharePending,
    icon: "none"
  });
};
</script>

<template>
  <view class="page">
    <AsyncStateCard v-if="loading" variant="loading" :text="detailCopy.loading" />
    <AsyncStateCard v-else-if="error" variant="error" :text="error" />
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
        {{ detailCopy.businessHours }}：{{
          pickLocalized(state.locale, place.business_hours_zh, place.business_hours_en)
        }}
      </view>
      <view class="line">{{
        pickLocalized(state.locale, place.intro_zh, place.intro_en)
      }}</view>
      <view v-if="place.is_recommended" class="recommendation">
        {{
          pickLocalized(
            state.locale,
            place.recommended_reason_zh ?? detailCopy.recommendedFallback,
            place.recommended_reason_en ?? detailCopy.recommendedFallback
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
        <button class="primary" @click="openNavigation">{{ detailCopy.openNavigation }}</button>
        <button class="secondary" @click="openMapPosition">
          {{ detailCopy.openMapPosition }}
        </button>
      </view>
      <view class="button-row">
        <button class="ghost" @click="favoritePlaceholder">{{ detailCopy.favoriteEntry }}</button>
        <button class="ghost" @click="sharePlaceholder">{{ detailCopy.shareEntry }}</button>
      </view>
    </SectionPanel>
    <AsyncStateCard v-else variant="empty" :text="detailCopy.empty" />
  </view>
</template>

<style scoped>
.page {
  padding: 24rpx;
  background: #f8fafc;
  min-height: 100vh;
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
