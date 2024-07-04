<script setup lang="ts">
import {defineProps, type PropType} from 'vue'
import type { FeedItem } from '@/types/discuitTypes'

import PostComponent from "@/components/post/PostComponent.vue";
import EmbeddedComment from "@/components/comments/EmbeddedComment.vue";

const props = defineProps({
  item: {
    type: Object as PropType<FeedItem>,
    required: true
  }
})
</script>

<template>
  <div>
    <PostComponent v-if="item.type === 'post'" :post="item.item" />
    <EmbeddedComment v-else-if="item.type === 'comment'" :comment="item.item" />
  </div>
</template>

<style scoped>

</style>