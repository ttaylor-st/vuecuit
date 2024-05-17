<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const post = ref(props.post)
</script>

<template>
  <div class="post-body">
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
  </div>
</template>

<style scoped>

.post-body {
  h2 {
    font-weight: bold;
    font-size: 1.5rem;
  }

  p {
    white-space: pre-wrap;
    max-height: calc(1.5rem * 3);
    overflow: hidden;
    position: relative;
  }
}
</style>