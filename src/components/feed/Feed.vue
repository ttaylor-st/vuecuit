<script setup lang="ts">
import type { Comment, Post } from '@/types/discuitTypes'

import { defineProps, ref, onUnmounted, onMounted } from 'vue'
import {useUserStore} from "@/stores/userStore";
import {useUrlStore} from "@/stores/urlStore";

import PostComponent from '@/components/post/PostComponent.vue'
import EmbeddedComment from '@/components/comments/EmbeddedComment.vue'
import FeedItem from '@/components/feed/FeedItem.vue'

const props = defineProps({
  username: {
    type: String,
    required: false
  },
  communityId: {
    type: String,
    required: false
  },
  // "user", "community", "home"
  type: {
    type: String,
    required: true,
    default: 'home'
  },
  sort: {
    type: String,
    required: false,
    default: 'hot'
  },
  userType: {
    type: String,
    required: false,
    default: 'overview'
  }
})
const next = ref<string | null>(null)
const isFetching = ref(false)

const userStore = useUserStore()
const urlStore = useUrlStore()

type FeedItem = {
  type: string,
  item: Post | Comment
}

type Feed = {
  items: FeedItem[]
  next: string | null
}

type Posts = {
  posts: Post[]
  next: string | null
}

const userFeed = ref<Feed[]>([])
const posts = ref<Post[]>([])

async function fetchPosts() {
  if (isFetching.value) return
  isFetching.value = true

  if (props.type === 'user') {
    const filter = props.userType === 'overview' ? '' : props.userType
    const url = `${urlStore.apiUrl}/users/${props.username}/feed?filter=${filter}&next=${next.value || ''}`
    const response = await userStore.makeRequest(url, 'GET')
    const data: Feed = response.data || {items: [], next: null}

    for (const feed of data.items) userFeed.value.push(feed)
    next.value = data.next

  } else if (props.type === 'community') {
    const url = `${urlStore.apiUrl}/posts?communityId=${props.communityId}&sort=${props.sort}&next=${next.value}`
    const response = await userStore.makeRequest(url, 'GET')
    const data: Posts = response.data || {posts: [], next: null}

    for (const post of data.posts) posts.value.push(post)
    next.value = data.next
  } else {
    const url = `${urlStore.apiUrl}/posts?sort=${props.sort}&next=${next.value}`
    const response = await userStore.makeRequest(url, 'GET')
    const data: Posts = response.data || {posts: [], next: null}

    for (const post of data.posts) posts.value.push(post)
    next.value = data.next
  }

  isFetching.value = false

}

function isBottom() {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight - 1080
}

onMounted(() => {
  fetchPosts()

  window.addEventListener('scroll', () => {
    if (isBottom()) fetchPosts()
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', () => {
    if (isBottom()) fetchPosts()
  })
});

</script>

<template>

  <div class="feed" v-if="props.type === 'home' || props.type === 'community' && posts.length > 0">
    <PostComponent v-for="post in posts" :key="post.publicId" :publicId="post.publicId" />
  </div>

  <div class="feed" v-else-if="props.type === 'user' && userFeed.length > 0">
    <FeedItem v-for="feed in userFeed" :key="feed.item.publicId" :item="feed" />
  </div>

</template>

<style scoped>

</style>