<script setup lang="ts">
import { ref } from 'vue'
import { markdownToHtml } from '@/lib/markdown'

const props = defineProps({
  post: {
    type: Object,
    required: true
  },
  fullBody: {
    type: Boolean,
    default: false
  }
})

const post = ref(props.post)
const body = markdownToHtml(post.value.body)
</script>

<template>
  <div class="post-body">
    <h2>{{ post.title }}</h2>
    <p class="content" v-html="body" :style="{ maxHeight: fullBody ? 'none' : 'calc(1.5rem * 3)' }"></p>
  </div>
</template>

<style scoped>

.post-body {
  h2 {
    font-weight: bold;
    font-size: 1.5rem;
  }

  .content {
    overflow: hidden;
    position: relative;
    word-wrap: break-word;
  }
}

img {
  width: 100%;
  height: auto;
  max-height: 10em;
}

</style>