<script setup lang="ts">
import { reactive } from "vue";

import { mobileApi } from "@/api/client";

const form = reactive({
  title: "Looking for a weekend language exchange",
  content: "Prefer English-Chinese exchange within Tongzilin.",
  language: "en" as "zh" | "en",
  tag_ids: ["social", "language"],
  location_text: "Tongzilin",
  image_file_ids: [] as string[],
  image_urls: [] as string[]
});

const submit = async () => {
  await mobileApi.discover.createPost(form);
  uni.showToast({ title: "已创建草稿帖", icon: "success" });
};
</script>

<template>
  <view class="page">
    <view class="section-title">发帖占位</view>
    <input v-model="form.title" class="input" />
    <textarea v-model="form.content" class="textarea" />
    <button class="primary" @click="submit">提交</button>
  </view>
</template>

<style scoped>
.page {
  padding: 24rpx;
}

.section-title {
  font-size: 34rpx;
  font-weight: 600;
  margin-bottom: 20rpx;
}

.input,
.textarea {
  width: 100%;
  background: white;
  border-radius: 20rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.textarea {
  min-height: 220rpx;
}

.primary {
  background: #1d4ed8;
  color: white;
}
</style>
