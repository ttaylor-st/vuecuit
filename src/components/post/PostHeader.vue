<script setup lang="ts">
import { getProfilePicture, timeSince } from '@/lib/utils'
import { ref } from 'vue'
import type { Post } from '@/types/discuitTypes'

const props = defineProps({
  post: {
    type: Object as () => Post,
    required: true
  }
})

const post = ref(props.post)

const timeElapsedHuman = timeSince(post.value.createdAt)
const humanReadableDate = new Date(post.value.createdAt).toLocaleString()

const author = post.value.author
const authorProfilePicture = getProfilePicture(author)

const community = post.value.community
const communityProfilePicture = getProfilePicture(community)
</script>

<template>

  <div class="post-header">
    <RouterLink @click.stop @keydown.stop
      class="post-header__community" :to="`/community/${post.community.name}`">
      <img :src="`${communityProfilePicture}`" alt="community image" />
      <span>{{ post.community.name }}</span>
    </RouterLink>

    <RouterLink @click.stop @keydown.stop
                class="post-header__user" :to="`/profile/${post.author.username}`">
      <img :src="authorProfilePicture" alt="user image" />
      <span>{{ post.author.username }}</span>
    </RouterLink>

    <span class="post-header__date" :title="humanReadableDate">{{ timeElapsedHuman }}</span>

  </div>

</template>

<style scoped>

.post-header {
  display: flex;
  gap: 0.5rem;
  color: inherit;
  font-size: 0.8rem;
  border-bottom: 1px solid hsla(var(--primary-600), 0.5);

  .post-header__community,
  .post-header__user,
  .post-header__date
  {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    background-color: hsl(var(--primary-200) / 0.5);
    padding: 0.25rem;
    border-radius: 5rem;
    user-select: none;
    border: 1px solid hsl(var(--primary-300) / 0.5);
    transition: 0.25s;

    &.post-header__community {
      margin-right: auto;
    }

    img {
      width: calc(0.8rem * 1.5);
      aspect-ratio: 1;
      border-radius: 50%;
    }

    span {
      font-weight: bold;
      margin-right: 0.5rem;
    }

    &:hover {
      background-color: hsl(var(--primary-200) / 0.75);
      border: 1px solid hsla(var(--primary-400) / 0.5);
      color: inherit;
    }

    &:active {
      background-color: hsl(var(--primary-200) / 0.9);
      border: 1px solid hsla(var(--primary-500) / 0.5);
    }
  }
}

</style>