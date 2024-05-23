<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useUrlStore } from '@/stores/urlStore'
import PostHeader from '@/components/post/PostHeader.vue'
import PostBody from '@/components/post/PostBody.vue'
import { ref } from 'vue'
import PostFooter from '@/components/post/PostFooter.vue'

const userStore = useUserStore()
const urlStore = useUrlStore()

const publicId = ref(useRoute().params.publicId)

const post = await userStore
  .makeRequest(`${urlStore.apiUrl}/posts/${publicId.value}`, 'GET')
  .then((res) => res.json())

const comments = await userStore
  .makeRequest(`${urlStore.apiUrl}/posts/${publicId.value}/comments`, 'GET')
  .then((res) => res.json())
</script>

<template>


    <section class="post">
      <PostHeader :post="post" />
      <PostBody :post="post" :full-body="true" />
      <PostFooter :post="post" />
    </section>

    <section class="comments">
      <h2>Comments</h2>
    </section>


</template>

<style scoped>

.post {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  background-color: hsl(var(--primary-200) / 0.25);
  border: 1px solid transparent;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.comments {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>