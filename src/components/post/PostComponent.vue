<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useUrlStore } from '@/stores/urlStore'
import { useRouter } from 'vue-router'

import PostHeader from '@/components/post/PostHeader.vue'
import PostBody from '@/components/post/PostBody.vue'

const userStore = useUserStore()
const urlStore = useUrlStore()
const router = useRouter()

const props = defineProps({
  publicId: {
    type: String,
    required: true
  }
})

const publicId = ref(props.publicId)

const post = await userStore
  .makeRequest(`${urlStore.apiUrl}/posts/${publicId.value}`, 'GET')
  .then((res) => res.json())

const navigateToPost = () => {
  router.push(`/post/${post.publicId}`)
}
</script>

<template>
  <div class="post" @click="navigateToPost" @keydown.enter="navigateToPost" tabindex="0" role="button">
    <PostHeader :post="post" />
    <PostBody :post="post" />
  </RouterLink>
</template>

<style scoped>
.post {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;

  background-color: hsl(var(--primary-200) / 0.25);
  border: 1px solid transparent;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: hsl(var(--primary-200) / 0.5);
  }

  &:active, &:focus, &:focus-within {
    background-color: hsl(var(--primary-200) / 0.75);
    border: 1px solid hsl(var(--primary-600) / 0.5);
  }
}
</style>
