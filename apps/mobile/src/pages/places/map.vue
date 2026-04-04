<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { PlaceMapMarker } from "@community-map/shared";
import { onLoad } from "@dcloudio/uni-app";

import { mobileApi } from "@/api/client";
import { pickLocalized, useAppStore } from "@/stores/app-store";

interface RenderedMarker {
  id: number;
  latitude: number;
  longitude: number;
  width: number;
  height: number;
  iconPath: string;
  callout: {
    content: string;
    color: string;
    fontSize: number;
    borderRadius: number;
    bgColor: string;
    padding: number;
    display: "BYCLICK";
  };
}

const DEFAULT_CENTER = {
  latitude: 30.615,
  longitude: 104.0625
};

const MARKER_ICON_PATH = "/static/place-marker.svg";

const { state } = useAppStore();
const places = ref<PlaceMapMarker[]>([]);
const loading = ref(true);
const selectedPlaceId = ref<string | null>(null);
const presetPlaceId = ref<string | null>(null);

const selectedPlace = computed(
  () =>
    places.value.find((place) => place._id === selectedPlaceId.value) ??
    places.value.find((place) => place._id === presetPlaceId.value) ??
    places.value[0] ??
    null
);

const mapLatitude = computed(
  () => selectedPlace.value?.location.latitude ?? DEFAULT_CENTER.latitude
);

const mapLongitude = computed(
  () => selectedPlace.value?.location.longitude ?? DEFAULT_CENTER.longitude
);

const renderedMarkers = computed<RenderedMarker[]>(() =>
  places.value.map((place, index) => ({
    id: index,
    latitude: place.location.latitude,
    longitude: place.location.longitude,
    width: 28,
    height: 36,
    iconPath: MARKER_ICON_PATH,
    callout: {
      content: pickLocalized(state.locale, place.name_zh, place.name_en),
      color: "#ffffff",
      fontSize: 12,
      borderRadius: 16,
      bgColor: "#0f766e",
      padding: 8,
      display: "BYCLICK"
    }
  }))
);

const loadMarkers = async () => {
  loading.value = true;
  try {
    const result = await mobileApi.places.mapMarkers();
    places.value = result.data;
    selectedPlaceId.value =
      result.data.find((place) => place._id === presetPlaceId.value)?._id ??
      result.data[0]?._id ??
      null;
  } finally {
    loading.value = false;
  }
};

const handleMarkerTap = (event: { detail?: { markerId?: number } }) => {
  const markerId = event.detail?.markerId;
  if (markerId === undefined) {
    return;
  }

  const place = places.value[markerId];
  if (place) {
    selectedPlaceId.value = place._id;
  }
};

const openDetail = () => {
  if (!selectedPlace.value) {
    return;
  }

  uni.navigateTo({
    url: `/pages/places/detail?id=${selectedPlace.value._id}`
  });
};

const openList = (recommended = false) => {
  uni.navigateTo({
    url: recommended ? "/pages/places/recommended" : "/pages/places/index"
  });
};

onMounted(loadMarkers);

onLoad((query) => {
  presetPlaceId.value = query?.id ? String(query.id) : null;
});
</script>

<template>
  <view class="page">
    <view class="title">社区地点地图</view>
    <view class="subtitle">
      `Places` 模块主入口：先在地图上浏览，再进入列表、推荐或详情。
    </view>
    <view class="action-row">
      <button class="secondary" @click="openList(false)">查看完整列表</button>
      <button class="secondary" @click="openList(true)">推荐地点</button>
    </view>

    <map
      class="map-card"
      :latitude="mapLatitude"
      :longitude="mapLongitude"
      :scale="15"
      :markers="renderedMarkers"
      :show-location="true"
      @markertap="handleMarkerTap"
    />

    <view v-if="loading" class="empty">地图点位加载中...</view>
    <view v-else-if="selectedPlace" class="detail-card">
      <view class="detail-title">
        {{
          pickLocalized(
            state.locale,
            selectedPlace.name_zh,
            selectedPlace.name_en
          )
        }}
      </view>
      <view class="detail-meta">{{ selectedPlace.category_level_1 }}</view>
      <view v-if="selectedPlace.is_recommended" class="pill">推荐地点</view>
      <view class="detail-meta">
        {{ selectedPlace.location.latitude }},
        {{ selectedPlace.location.longitude }}
      </view>
      <button class="primary" @click="openDetail">查看地点详情</button>
    </view>
    <view v-else class="empty">暂无已发布地点可显示。</view>
  </view>
</template>

<style scoped>
.page {
  padding: 24rpx;
  background: #f8fafc;
  min-height: 100vh;
}

.title {
  font-size: 36rpx;
  font-weight: 700;
}

.subtitle {
  color: #6b7280;
  margin-top: 12rpx;
  margin-bottom: 24rpx;
  line-height: 1.6;
}

.map-card {
  width: 100%;
  height: 720rpx;
  border-radius: 24rpx;
  overflow: hidden;
  background: #e2e8f0;
}

.action-row {
  display: flex;
  gap: 16rpx;
  margin-bottom: 20rpx;
}

.secondary {
  flex: 1;
  background: #ccfbf1;
  color: #115e59;
}

.detail-card {
  margin-top: 24rpx;
  background: #ffffff;
  border-radius: 24rpx;
  padding: 28rpx;
  box-shadow: 0 20rpx 40rpx rgba(15, 118, 110, 0.08);
}

.detail-title {
  font-size: 32rpx;
  font-weight: 600;
}

.detail-meta {
  margin-top: 10rpx;
  color: #64748b;
}

.pill {
  display: inline-flex;
  margin-top: 14rpx;
  padding: 6rpx 14rpx;
  border-radius: 999rpx;
  background: #dcfce7;
  color: #166534;
  font-size: 22rpx;
}

.primary {
  margin-top: 24rpx;
  background: #0f766e;
  color: #ffffff;
}

.empty {
  margin-top: 24rpx;
  padding: 32rpx 24rpx;
  background: #ffffff;
  border-radius: 24rpx;
  color: #64748b;
  text-align: center;
}
</style>
