<script setup lang="ts">
import { getProfilePicture, timeSince } from '@/lib/utils'
import type { Post } from '@/types/discuitTypes'
import { ref } from 'vue'

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

<style scoped lang="scss">
@import '@/assets/css/mixins.scss';

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
    user-select: none;
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
      color: var(--primary-600);
    }


    &:focus {
      color: var(--primary-600);
    }
  }
}

</style>