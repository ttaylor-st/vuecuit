<script lang="ts" setup>
import { useUrlStore } from '@/stores/urlStore'
import type {Post} from '@/types/discuitTypes'
import {ref, onMounted} from 'vue'
import DiscuitImage from '../DiscuitImage.vue'
import Markdown from "@/components/Markdown.vue";

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

const link = ref<string | null>(null)
const post = ref(props.post)
const body = ref<string | null>(null)
const image = ref<string | null>(null)

onMounted(() => {
  if (post.value.type === 'link') {
    link.value = post.value.link
    if (post.value.link.image) image.value = `${urlStore.url}${post.value.link.image.url}`
  }
  if (post.value.type === 'image') image.value = `${urlStore.url}${post.value.image.url}`
})


</script>

<template>
  <div class="post-body">
    <h2>{{ post.title }}</h2>
    <div :style="{ maxHeight: props.fullBody ? 'none' : 'calc(1.5rem * 3)' }" class="content">
      <Markdown :markdown="post.body" v-if="post.body" />
    </div>

    <div v-if="image" class="image" @click.stop @keydown.enter.stop role="button">
      <a :href="link.url" target="_blank" v-if="link">
        <DiscuitImage :src="image" alt="Post image" v-if="link.image" />
        <p>Via <span class="hostname">{{ link.hostname }}</span></p>
      </a>

      <DiscuitImage v-else :src="image" alt="Post image" />

    </div>

  </div>
</template>
