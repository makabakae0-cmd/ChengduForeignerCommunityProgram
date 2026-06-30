<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

import { mobileApi } from "@/api/client";
import SectionPanel from "@/components/SectionPanel.vue";

const post = ref<any | null>(null);
const commentValue = ref("欢迎来桐梓林一起打球。");

onLoad(async (query) => {
  if (!query?.id) {
    return;
  }
  const result = await mobileApi.discover.detailPost(String(query.id));
  post.value = result.data;
});

const submitComment = async () => {
  if (!post.value) {
    return;
  }
  await mobileApi.discover.createComment(post.value._id, {
    content: commentValue.value,
    language: "zh"
  });
  uni.showToast({ title: "评论已提交", icon: "success" });
};
</script>

<template>
  <view class="page" v-if="post">
    <SectionPanel :title="post.title" :subtitle="post.language">
      <view class="content">{{ post.content }}</view>
      <textarea v-model="commentValue" class="textarea" />
      <button class="primary" @click="submitComment">发表评论</button>
    </SectionPanel>
  </view>
</template>

<style scoped>
.page {
  padding: 24rpx;
}

.content {
  line-height: 1.7;
}

.textarea {
  width: 100%;
  min-height: 180rpx;
  background: #f9fafb;
  border-radius: 20rpx;
  margin-top: 20rpx;
  padding: 20rpx;
}

.primary {
  margin-top: 20rpx;
  background: #1d4ed8;
  color: white;
}
</style>
