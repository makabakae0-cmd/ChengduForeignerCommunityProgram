<script setup lang="ts">
import { computed, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import type { PlaceListItem } from "@community-map/shared";

import { mobileApi } from "@/api/client";
import SectionPanel from "@/components/SectionPanel.vue";
import { pickLocalized, useAppStore } from "@/stores/app-store";

const { state } = useAppStore();
const places = ref<PlaceListItem[]>([]);
const loading = ref(false);
const error = ref("");
const filters = ref({
  keyword: "",
  category: "",
  tags: "",
  sort: "recommended" as "recommended" | "name"
});

const categories = computed(() =>
  Array.from(new Set(places.value.map((place) => place.category_level_1)))
);
const categoryOptions = computed(() => ["", ...categories.value]);

const load = async () => {
  loading.value = true;
  error.value = "";

  try {
    const result = await mobileApi.places.list({
      communityId: state.communityId,
      keyword: filters.value.keyword || undefined,
      category: filters.value.category || undefined,
      tags: filters.value.tags
        ? filters.value.tags
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : undefined,
      sort: filters.value.sort
    });
    places.value = result.data.items;
  } catch (loadError) {
    error.value = loadError instanceof Error ? loadError.message : "列表加载失败";
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
  uni.navigateTo({
    url: "/pages/places/map"
  });
};

const openRecommended = () => {
  uni.navigateTo({
    url: "/pages/places/recommended"
  });
};

const handleCategoryChange = (event: { detail: { value: number | string } }) => {
  filters.value.category =
    categoryOptions.value[Number(event.detail.value)] ?? "";
  load();
};

const resetFilters = () => {
  filters.value = {
    keyword: "",
    category: "",
    tags: "",
    sort: "recommended"
  };
  load();
};

onLoad((query) => {
  filters.value.keyword = String(query?.keyword ?? "");
  filters.value.category = String(query?.category ?? "");
  filters.value.tags = String(query?.tags ?? "");
  filters.value.sort =
    query?.sort === "name" ? "name" : "recommended";

  load();
});
</script>

<template>
  <view class="page">
    <SectionPanel title="Places List" subtitle="列表页承担模块内完整筛选与推荐分流">
      <view class="toolbar">
        <button class="secondary" @click="openMap">返回地图主页</button>
        <button class="secondary" @click="openRecommended">推荐地点</button>
      </view>
      <input
        v-model="filters.keyword"
        class="field"
        placeholder="搜索地点名称或简介"
        @confirm="load"
      />
      <picker
        :range="categoryOptions"
        :value="categoryOptions.indexOf(filters.category)"
        @change="handleCategoryChange"
      >
        <view class="picker">
          分类：{{ filters.category || "全部" }}
        </view>
      </picker>
      <input
        v-model="filters.tags"
        class="field"
        placeholder="按标签筛选，多个标签用逗号分隔"
        @confirm="load"
      />
      <view class="sort-row">
        <button
          class="chip"
          :class="{ active: filters.sort === 'recommended' }"
          @click="filters.sort = 'recommended'; load()"
        >
          推荐优先
        </button>
        <button
          class="chip"
          :class="{ active: filters.sort === 'name' }"
          @click="filters.sort = 'name'; load()"
        >
          名称排序
        </button>
        <button class="chip ghost" @click="resetFilters">清空筛选</button>
      </view>

      <view v-if="loading" class="status-card">地点列表加载中...</view>
      <view v-else-if="error" class="status-card error">{{ error }}</view>
      <view v-else-if="places.length === 0" class="status-card">
        当前筛选条件下暂无地点。
      </view>
      <view
        v-else
        v-for="place in places"
        :key="place._id"
        class="card"
        @click="openDetail(place._id)"
      >
        <view class="card-top">
          <view class="card-title">{{
            pickLocalized(state.locale, place.name_zh, place.name_en)
          }}</view>
          <view v-if="place.is_recommended" class="badge">推荐</view>
        </view>
        <view class="card-meta">
          {{ place.category_level_1 }} / {{ place.category_level_2 }}
        </view>
        <view class="card-text">{{
          pickLocalized(state.locale, place.short_address_zh, place.short_address_en)
        }}</view>
        <view class="card-text">{{
          pickLocalized(state.locale, place.summary_zh, place.summary_en)
        }}</view>
        <view v-if="place.tag_ids.length" class="tags">
          <text v-for="tag in place.tag_ids" :key="tag" class="tag">#{{ tag }}</text>
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

.toolbar,
.sort-row {
  display: flex;
  gap: 16rpx;
  margin-bottom: 16rpx;
  flex-wrap: wrap;
}

.secondary,
.chip {
  background: #ccfbf1;
  color: #115e59;
  font-size: 24rpx;
}

.chip.active {
  background: #0f766e;
  color: #ffffff;
}

.chip.ghost {
  background: #e2e8f0;
  color: #334155;
}

.field,
.picker {
  margin-bottom: 16rpx;
  background: #ffffff;
  border-radius: 18rpx;
  padding: 20rpx 24rpx;
  font-size: 26rpx;
}

.status-card {
  margin-top: 12rpx;
  padding: 28rpx 24rpx;
  border-radius: 20rpx;
  background: #f1f5f9;
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

.card-top {
  display: flex;
  justify-content: space-between;
  gap: 16rpx;
  align-items: flex-start;
}

.card-title {
  font-size: 32rpx;
  font-weight: 600;
}

.card-meta,
.card-text {
  margin-top: 10rpx;
  color: #6b7280;
}

.badge,
.tag {
  display: inline-flex;
  align-items: center;
  padding: 6rpx 14rpx;
  border-radius: 999rpx;
  background: #dcfce7;
  color: #166534;
  font-size: 22rpx;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  margin-top: 14rpx;
}
</style>
