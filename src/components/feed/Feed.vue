<script setup lang="ts">
import { defineProps, onUnmounted, onMounted, computed, nextTick, ref } from 'vue'
import { useUserStore } from "@/stores/userStore"
import { useUrlStore } from "@/stores/urlStore"
import { useFeedStore } from "@/stores/feedStore"

import PostComponent from '@/components/post/PostComponent.vue'
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

const initTime = new Date().getTime()

const userStore = useUserStore()
const urlStore = useUrlStore()
const feedStore = useFeedStore()

const feedKey = computed(() => {
  if (props.type === 'user') return `user-${props.username}-${props.userType}`
  if (props.type === 'community') return `community-${props.communityId}-${props.sort}`
  return `home-${props.sort}`
})

const currentFeed = computed(() => feedStore[feedKey.value])

const isInitialized = ref(false)

feedStore.initializeFeed(feedKey.value, {
  type: props.type,
  sort: props.sort,
  username: props.username,
  communityId: props.communityId,
  userType: props.userType
})

async function fetchPosts() {
  if (currentFeed.value.isFetching) return
  feedStore.setIsFetching(feedKey.value, true)

  if (currentFeed.value.type === 'user') {
    const filter = currentFeed.value.userType === 'overview' ? '' : currentFeed.value.userType
    const url = `${urlStore.apiUrl}/users/${currentFeed.value.username}/feed?filter=${filter}&next=${currentFeed.value.next || ''}`
    const response = await userStore.makeRequest(url, 'GET')
    const data = response.data || {items: [], next: null}

    feedStore.addUserFeedItems(feedKey.value, data.items)
    feedStore.setNext(feedKey.value, data.next)
  } else {
    const url = currentFeed.value.type === 'community'
      ? `${urlStore.apiUrl}/posts?communityId=${currentFeed.value.communityId}&sort=${currentFeed.value.sort}&next=${currentFeed.value.next}`
      : `${urlStore.apiUrl}/posts?sort=${currentFeed.value.sort}&next=${currentFeed.value.next}`
    const response = await userStore.makeRequest(url, 'GET')
    const data = response.data || {posts: [], next: null}

    feedStore.addPosts(feedKey.value, data.posts)
    feedStore.setNext(feedKey.value, data.next)
  }

  feedStore.setIsFetching(feedKey.value, false)
}

function isBottom() {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight - 1080
}

function saveScrollPosition() {
  if (window.scrollY === 0 || initTime > new Date().getTime() - 500) return
  feedStore.setScrollPosition(feedKey.value, window.scrollY)
}

function restoreScrollPosition() {
  nextTick(() => {
    window.scrollTo(0, currentFeed.value.scrollPosition)
  })
}

onMounted(async () => {
  if (currentFeed.value.posts.length === 0 && currentFeed.value.items.length === 0) {
    await fetchPosts()
  }

  restoreScrollPosition()
  isInitialized.value = true

  window.addEventListener('scroll', () => {
    if (isBottom()) fetchPosts()
    if (isInitialized.value) saveScrollPosition()
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', () => {
    if (isBottom()) fetchPosts()
    if (isInitialized.value) saveScrollPosition()
  })
});

</script>

<template>
  <div class="feed" v-if="currentFeed.type === 'home' || currentFeed.type === 'community' && currentFeed.posts.length > 0">
    <PostComponent v-for="post in currentFeed.posts" :key="post.publicId" :post="post" />
  </div>

  <div class="feed" v-else-if="currentFeed.type === 'user' && currentFeed.items.length > 0">
    <FeedItem v-for="feed in currentFeed.items" :key="feed.item.publicId" :item="feed" />
  </div>
</template>