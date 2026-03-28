<script setup lang="ts">
import { onMounted, ref } from "vue";

import { mobileApi } from "@/api/client";
import SectionPanel from "@/components/SectionPanel.vue";

const posts = ref<Array<any>>([]);

const load = async () => {
  const result = await mobileApi.discover.listPosts();
  posts.value = result.data.items;
};

const openDetail = (id: string) => {
  uni.navigateTo({
    url: `/pages/discover/detail?id=${id}`
  });
};

const openCreate = () => {
  uni.navigateTo({
    url: "/pages/discover/create"
  });
};

onMounted(load);
</script>

<template>
  <view class="page">
    <SectionPanel title="Discover" subtitle="内容流、发帖和详情壳已就位">
      <button class="primary" @click="openCreate">发布帖子</button>
      <view v-for="post in posts" :key="post._id" class="card" @click="openDetail(post._id)">
        <view class="card-title">{{ post.title }}</view>
        <view class="card-text">{{ post.content }}</view>
      </view>
    </SectionPanel>
  </view>
</template>

<style scoped>
.page {
  padding: 24rpx;
}

.primary {
  margin-bottom: 20rpx;
  background: #1d4ed8;
  color: white;
}

.card {
  padding: 24rpx 0;
  border-bottom: 1rpx solid #e5e7eb;
}

.card-title {
  font-size: 32rpx;
  font-weight: 600;
}

.card-text {
  margin-top: 10rpx;
  color: #6b7280;
}
</style>
