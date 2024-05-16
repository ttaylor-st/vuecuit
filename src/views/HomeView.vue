<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useUrlStore } from '@/stores/urlStore'
import PostComponent from '@/views/PostComponent.vue'

const userStore = useUserStore()
const urlStore = useUrlStore()

const posts = ref([])

const fetchPosts = await userStore.makeRequest(`${urlStore.apiUrl}/posts`, 'GET')
const data = await fetchPosts.json()
posts.value = data.posts
</script>

<template>
  <main>
    <section>
      <h1>Home</h1>
      <p>Posts will go here at some point.</p>
      <div class="posts">
        <div v-for="post in posts" :key="post.publicId">
          <PostComponent :publicId="post.publicId" />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.posts {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
