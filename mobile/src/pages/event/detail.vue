<template>
  <view class="page">
    <view v-if="loading" class="state-text">加载中...</view>
    <view v-else-if="error" class="state-text error">{{ error }}</view>

    <template v-else-if="event">
      <image class="cover" :src="event.coverUrl" mode="aspectFill" />

      <view class="card">
        <view class="title-row">
          <text class="title">{{ event.title }}</text>
          <text class="status" :class="statusClass(event.status)">{{ statusLabel(event.status) }}</text>
        </view>
        <text class="meta">时间：{{ formatTime(event.startTime) }} - {{ formatTime(event.endTime) }}</text>
        <text class="meta">地点：{{ event.location }}</text>
        <text class="meta">主办：{{ event.organizer }}</text>
        <text class="meta">名额：{{ event.registeredCount }}/{{ event.capacityTotal }}</text>
        <text class="meta">费用：{{ event.fee === 0 ? '免费' : `￥${event.fee}` }}</text>
      </view>

      <view class="card">
        <text class="section-title">活动流程</text>
        <view v-if="event.agenda.length">
          <view v-for="item in event.agenda" :key="item.time" class="agenda-item">
            <text class="agenda-time">{{ item.time }}</text>
            <text class="agenda-title">{{ item.title }}</text>
          </view>
        </view>
        <text v-else class="meta">暂无活动流程</text>
      </view>

      <view class="card">
        <text class="section-title">活动详情</text>
        <text class="details">{{ event.details }}</text>
      </view>

      <button class="btn" type="primary" @click="register">立即报名（MVP）</button>
    </template>

    <view v-else class="state-text">活动不存在</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getEventDetail } from '@/services/event.client';
import type { EventItem, EventStatus } from '@/types/event';

const event = ref<EventItem>();
const loading = ref(false);
const error = ref('');

onLoad((query) => {
  const id = typeof query?.id === 'string' ? query.id : '';
  void loadEvent(id);
});

async function loadEvent(id: string) {
  if (!id) {
    error.value = '缺少活动ID';
    return;
  }

  loading.value = true;
  error.value = '';
  try {
    event.value = await getEventDetail(id);
    if (!event.value) {
      error.value = '活动不存在';
    }
  } catch (err) {
    console.error(err);
    error.value = '活动加载失败，请稍后重试';
  } finally {
    loading.value = false;
  }
}

function register() {
  if (!event.value) {
    return;
  }
  uni.navigateTo({ url: `/pages/event/signup?id=${event.value.id}` });
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

.state-text {
  margin-top: 160rpx;
  text-align: center;
  color: #6b7280;
}

.state-text.error {
  color: #b91c1c;
}

.cover {
  width: 100%;
  height: 300rpx;
  border-radius: 20rpx;
}

.card {
  margin-top: 20rpx;
  background: #ffffff;
  border-radius: 20rpx;
  padding: 22rpx;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16rpx;
}

.title {
  display: block;
  font-size: 34rpx;
  font-weight: 700;
  margin-bottom: 10rpx;
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
  margin-top: 6rpx;
  color: #374151;
  font-size: 25rpx;
}

.section-title {
  display: block;
  font-size: 30rpx;
  font-weight: 700;
  margin-bottom: 10rpx;
}

.agenda-item {
  display: flex;
  gap: 16rpx;
  margin-top: 8rpx;
}

.agenda-time {
  color: #1d4ed8;
  min-width: 160rpx;
}

.agenda-title {
  color: #111827;
}

.details {
  color: #374151;
  line-height: 1.7;
}

.btn {
  margin-top: 24rpx;
}
</style>
