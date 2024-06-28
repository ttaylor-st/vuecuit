<script lang="ts" setup>
import { markdownToHtml } from '@/lib/markdown'
import { useUrlStore } from '@/stores/urlStore'
import type {Image, Link, Post} from '@/types/discuitTypes'
import { ref, computed } from 'vue'
import DiscuitImage from '../DiscuitImage.vue'

const urlStore = useUrlStore()
const props = defineProps({
  post: {
    type: Object as () => Post,
    required: true
  },
  fullBody: {
    type: Boolean,
    default: false
  }
})

const post = ref(props.post)
const body = computed(() => markdownToHtml(`${post.value?.body?.slice(0, 500)}...`))

const image = computed(() => {
  if (!post.value) return
  if (post.value.type === 'image') {
    if (!post.value.image) return
    return `${urlStore.url}${post.value.image.url}`
  }
  if (post.value.type === 'link') {
    if (!post.value.link) return
    const link = post.value.link
    if (link.image) return `${urlStore.url}${link.image.url}`
  }
})

const link = computed(() => {
  if (post.value.type === 'link') return post.value.link
})


</script>

<template>
  <div class="post-body">
    <h2>{{ post.title }}</h2>
    <p v-if="fullBody" :style="{ maxHeight: fullBody ? 'none' : 'calc(1.5rem * 3)' }" class="content" v-html="body"></p>

    <div v-if="image" class="image" @click.stop @keydown.enter.stop role="button">
      <a :href="link.url" target="_blank" v-if="link">
        <DiscuitImage :src="image" alt="Post image" v-if="link.image" />
        <p>Via <span class="hostname">{{ link.hostname }}</span></p>
      </a>

      <DiscuitImage v-else :src="image" alt="Post image" />

    </div>

  </div>
</template>
