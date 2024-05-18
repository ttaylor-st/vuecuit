<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useUrlStore } from '@/stores/urlStore'
import PostHeader from '@/components/post/PostHeader.vue'
import PostBody from '@/components/post/PostBody.vue'
import { ref } from 'vue'

const userStore = useUserStore()
const urlStore = useUrlStore()

const publicId = ref(useRoute().params.publicId)

const post = await userStore
  .makeRequest(`${urlStore.apiUrl}/posts/${publicId.value}`, 'GET')
  .then((res) => res.json())

// TODO: Fetch comments

</script>

<template>

  <main>
    <section class="post">
      <PostHeader :post="post" />
      <PostBody :post="post" :full-body="true" />
    </section>
  </main>

</template>

<style scoped>

</style>