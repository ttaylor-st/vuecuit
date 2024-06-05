<script lang="ts" setup>
import { markdownToHtml } from '@/lib/markdown'
import { useUrlStore } from '@/stores/urlStore'
import type { Post } from '@/types/discuitTypes'
import { ref } from 'vue'

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
const body = markdownToHtml(post.value.body)
let image: string = null
let link: object = null

if (post.value.type === 'image') image = `${urlStore.url}${post.value.image.url}`
if (post.value.type === 'link') {
  link = post.value.link
  image = `${urlStore.url}${link.image.url}`
}
</script>

<template>
  <div class="post-body">
    <h2>{{ post.title }}</h2>
    <p v-if="fullBody" :style="{ maxHeight: fullBody ? 'none' : 'calc(1.5rem * 3)' }" class="content" v-html="body"></p>

    <div v-if="image" class="image" @click.stop @keydown.enter.stop role="button">
      <a :href="link.url" target="_blank" v-if="link">
        <img :src="image" alt="Post image" />
        <p>Via <span class="hostname">{{ link.hostname }}</span></p>
      </a>

      <img v-else :src="image" alt="Post image" />

    </div>

  </div>
</template>
