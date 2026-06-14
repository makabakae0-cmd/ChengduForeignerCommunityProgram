<template>
  <view class="page">
    <view class="tabs">
      <text
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-item"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </text>
    </view>

    <view v-if="loading" class="state-text">加载中...</view>
    <view v-else-if="error" class="state-text error">{{ error }}</view>

    <template v-else>
      <view v-for="item in filteredEvents" :key="item.id" class="card" @click="goDetail(item.id)">
        <image class="cover" :src="item.coverUrl" mode="aspectFill" />
        <view class="content">
          <view class="title-row">
            <text class="title">{{ item.title }}</text>
            <text class="status" :class="statusClass(item.status)">{{ statusLabel(item.status) }}</text>
          </view>
          <text class="meta">{{ formatTime(item.startTime) }} - {{ formatTime(item.endTime) }}</text>
          <text class="meta">{{ item.location }}</text>
          <view class="footer">
            <text class="quota">剩余名额 {{ remainCount(item) }}/{{ item.capacityTotal }}</text>
            <text class="action">查看详情</text>
          </view>
        </view>
      </view>

      <view v-if="!filteredEvents.length" class="empty">
        <text class="empty-title">暂无活动</text>
        <text class="empty-desc">{{ emptyText }}</text>
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { getEventList } from '@/services/event.client';
import type { EventItem, EventStatus } from '@/types/event';

type TabKey = 'all' | 'thisWeek' | 'upcoming' | 'mine';

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: 'all', label: '全部' },
  { key: 'thisWeek', label: '本周' },
  { key: 'upcoming', label: '即将开始' },
  { key: 'mine', label: '我的' },
];

const activeTab = ref<TabKey>('all');
const loading = ref(false);
const error = ref('');
const events = ref<EventItem[]>([]);

onMounted(async () => {
  await loadEvents();
});

async function loadEvents() {
  loading.value = true;
  error.value = '';
  try {
    events.value = await getEventList();
  } catch (err) {
    console.error(err);
    error.value = '加载失败，请稍后重试';
  } finally {
    loading.value = false;
  }
}

const filteredEvents = computed(() => {
  const now = new Date();
  const startOfWeek = getStartOfWeek(now);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 7);

  return events.value.filter((item) => {
    const start = new Date(item.startTime);

    if (activeTab.value === 'mine') {
      return item.isRegistered === true;
    }

    if (activeTab.value === 'upcoming') {
      return item.status === 'open' && start > now;
    }

    if (activeTab.value === 'thisWeek') {
      return start >= startOfWeek && start < endOfWeek;
    }

    return true;
  });
});

const emptyText = computed(() => {
  if (activeTab.value === 'mine') {
    return '你还没有报名活动';
  }
  if (activeTab.value === 'upcoming') {
    return '暂无即将开始的活动';
  }
  if (activeTab.value === 'thisWeek') {
    return '本周暂无活动';
  }
  return '请稍后再来看看';
});

function goDetail(id: string) {
  uni.navigateTo({ url: `/pages/event/detail?id=${id}` });
}

function remainCount(item: EventItem) {
  const remain = item.capacityTotal - item.registeredCount;
  return remain > 0 ? remain : 0;
}

function statusLabel(status: EventStatus) {
  if (status === 'ongoing') return '进行中';
  if (status === 'ended') return '已结束';
  if (status === 'cancelled') return '已取消';
  return '报名中';
}

function statusClass(status: EventStatus) {
  return `status-${status}`;
}

function getStartOfWeek(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const offset = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + offset);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatTime(input: string) {
  const date = new Date(input);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${mm}-${dd} ${hh}:${min}`;
}
</script>

<style scoped>
.page {
  padding: 24rpx;
}

.tabs {
  display: flex;
  gap: 12rpx;
  margin-bottom: 20rpx;
  overflow-x: auto;
  white-space: nowrap;
}

.tab-item {
  padding: 12rpx 20rpx;
  border-radius: 999rpx;
  background: #e5e7eb;
  color: #374151;
  font-size: 24rpx;
}

.tab-item.active {
  background: #1d4ed8;
  color: #ffffff;
}

.state-text {
  margin-top: 120rpx;
  text-align: center;
  color: #6b7280;
}

.state-text.error {
  color: #b91c1c;
}

.card {
  margin-bottom: 20rpx;
  background: #ffffff;
  border-radius: 20rpx;
  overflow: hidden;
}

.cover {
  width: 100%;
  height: 240rpx;
}

.content {
  padding: 20rpx;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16rpx;
}

.title {
  display: block;
  font-size: 30rpx;
  font-weight: 700;
}

.status {
  padding: 4rpx 12rpx;
  border-radius: 999rpx;
  font-size: 20rpx;
}

.status-open {
  background: #e0e7ff;
  color: #1d4ed8;
}

.status-ongoing {
  background: #dcfce7;
  color: #166534;
}

.status-ended,
.status-cancelled {
  background: #f3f4f6;
  color: #6b7280;
}

.meta {
  display: block;
  margin-top: 8rpx;
  color: #4b5563;
  font-size: 24rpx;
}

.footer {
  margin-top: 14rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.quota {
  color: #111827;
  font-size: 24rpx;
}

.action {
  color: #1d4ed8;
  font-weight: 600;
  font-size: 24rpx;
}

.empty {
  margin-top: 120rpx;
  text-align: center;
}

.empty-title {
  display: block;
  color: #374151;
  font-weight: 700;
}

.empty-desc {
  display: block;
  color: #6b7280;
  margin-top: 8rpx;
}
</style>
