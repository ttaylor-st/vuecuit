<script lang="ts" setup>
import { ref } from 'vue'
import { markdownToHtml } from '@/lib/markdown'

import { useUrlStore } from '@/stores/urlStore'

const urlStore = useUrlStore()
const props = defineProps({
  post: {
    type: Object,
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

<style scoped lang="scss">
@import '@/assets/css/mixins.scss';

.post-body {
  h2 {
    font-weight: bold;
    font-size: 1.5rem;
  }

  .content {
    overflow: hidden;
    position: relative;
    word-wrap: break-word;
  }
}

.image {

  padding: 0;
  position: relative;
  overflow: hidden;
  outline: 2px solid transparent;
  border-radius: 0.5rem;
  border: 1px solid hsla(var(--background-200) / 1);
  transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 0.5rem;
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  p {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: hsla(var(--background-50) / 0.8);
    color: hsla(var(--text-950) / 1);
    padding: 0.5rem;
    font-size: 0.8rem;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(4px);

    .hostname {
      font-weight: bold;
    }
  }

  &:hover {
    img {
      transform: scale(1.05);
    }
    p {
      background-color: hsla(var(--background-100) / 1);
    }
  }

  &:focus {
    @include outline;
  }

}

</style>