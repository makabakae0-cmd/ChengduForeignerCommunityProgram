<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

import { mobileApi } from "@/api/client";
import SectionPanel from "@/components/SectionPanel.vue";
import { pickLocalized, useAppStore } from "@/stores/app-store";

const { state } = useAppStore();
const event = ref<any | null>(null);
const registeredMessage = ref("");

onLoad(async (query) => {
  if (!query?.id) {
    return;
  }
  const result = await mobileApi.events.detail(String(query.id));
  event.value = result.data;
});

const register = async () => {
  if (!event.value) {
    return;
  }
  const result = await mobileApi.events.register(event.value._id, {
    contact_name: "Jerry",
    contact_phone: "13800000000",
    attendee_count: 1,
    source_channel: "miniapp"
  });
  registeredMessage.value = `报名成功，凭证号 ${result.data.ticket.ticket_code}`;
};
</script>

<template>
  <view class="page" v-if="event">
    <SectionPanel :title="pickLocalized(state.locale, event.title_zh, event.title_en)">
      <view class="line">{{ pickLocalized(state.locale, event.summary_zh, event.summary_en) }}</view>
      <view class="line">{{ event.address_text }}</view>
      <view class="line">{{ event.start_time }}</view>
      <button class="primary" @click="register">模拟报名</button>
      <view v-if="registeredMessage" class="success">{{ registeredMessage }}</view>
    </SectionPanel>
  </view>
</template>

<style scoped>
.page {
  padding: 24rpx;
}

.line {
  margin-bottom: 16rpx;
}

.primary {
  margin-top: 20rpx;
  background: #0f766e;
  color: white;
}

.success {
  margin-top: 16rpx;
  color: #047857;
}
</style>
