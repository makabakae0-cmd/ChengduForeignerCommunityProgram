<template>
  <view class="page">
    <view v-if="loading" class="state-text">加载中...</view>
    <view v-else-if="error" class="state-text error">{{ error }}</view>

    <template v-else-if="event">
      <view class="card">
        <text class="title">{{ event.title }}</text>
        <text class="meta">时间：{{ formatTime(event.startTime) }} - {{ formatTime(event.endTime) }}</text>
        <text class="meta">地点：{{ event.location }}</text>
      </view>

      <view class="card">
        <text class="section-title">报名信息</text>

        <view class="field">
          <text class="label">姓名</text>
          <input v-model="form.name" class="input" placeholder="请输入姓名" />
        </view>

        <view class="field">
          <text class="label">电话</text>
          <input v-model="form.phone" class="input" placeholder="请输入电话" type="number" />
        </view>

        <button class="btn" type="primary" @click="submit">提交报名</button>
      </view>
    </template>

    <view v-else class="state-text">活动不存在</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getEventDetail } from '@/services/event.client';
import type { EventItem } from '@/types/event';

const loading = ref(false);
const error = ref('');
const event = ref<EventItem>();
const form = ref({
  name: '',
  phone: '',
});

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

function submit() {
  const name = form.value.name.trim();
  const phone = form.value.phone.trim();

  if (!name || !phone) {
    uni.showToast({ title: '请填写姓名和电话', icon: 'none' });
    return;
  }

  uni.showToast({ title: '报名页骨架已完成', icon: 'success' });
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

.card {
  margin-top: 20rpx;
  background: #ffffff;
  border-radius: 20rpx;
  padding: 24rpx;
}

.title {
  display: block;
  font-size: 32rpx;
  font-weight: 700;
}

.meta {
  display: block;
  margin-top: 8rpx;
  color: #374151;
  font-size: 25rpx;
}

.section-title {
  display: block;
  margin-bottom: 18rpx;
  font-size: 30rpx;
  font-weight: 700;
}

.field {
  margin-bottom: 18rpx;
}

.label {
  display: block;
  margin-bottom: 8rpx;
  color: #4b5563;
  font-size: 24rpx;
}

.input {
  height: 78rpx;
  padding: 0 20rpx;
  border-radius: 12rpx;
  background: #f3f4f6;
  font-size: 26rpx;
}

.btn {
  margin-top: 8rpx;
}
</style>
