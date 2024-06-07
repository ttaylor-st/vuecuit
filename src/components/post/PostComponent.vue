<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useUrlStore } from '@/stores/urlStore'
import { useRouter } from 'vue-router'

import PostHeader from '@/components/post/PostHeader.vue'
import PostBody from '@/components/post/PostBody.vue'
import PostFooter from '@/components/post/PostFooter.vue'
import type {Post} from "@/types/discuitTypes";

const userStore = useUserStore()
const urlStore = useUrlStore()
const router = useRouter()

const loading = ref(true)
const props = defineProps({
  publicId: {
    type: String,
    required: true
  }
})

const publicId = ref(props.publicId)
const post = ref<Post>()

onMounted(async () => {
  post.value = await userStore
      .makeRequest(`${urlStore.apiUrl}/posts/${publicId.value}`, 'GET')
      .then((res) => res.json())
      .catch((err) => console.error(err))

  loading.value = false
})


const navigateToPost = () => {
  router.push(`/post/${publicId.value}`)
}
</script>

<template>
  <div class="post" @click="navigateToPost" @keydown.enter="navigateToPost" tabindex="0" role="button"
    aria-label="View post" aria-describedby="post" v-if="!loading">
    <PostHeader :post="post" />
    <PostBody :post="post" />
    <PostFooter :post="post" />
  </div>
  <div v-else class="post">
    <div class="skeleton skeleton--post-header">
      <div class="skeleton skeleton--avatar"></div>
      <div class="skeleton skeleton--username"></div>
      <div class="skeleton skeleton--date"></div>
    </div>
    <div class="skeleton skeleton--post-body"></div>
    <div class="skeleton skeleton--post-footer"></div>
  </div>
</template>
