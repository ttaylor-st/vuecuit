<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useUrlStore } from '@/stores/urlStore'
import { getProfilePicture, timeSince } from '@/lib/utils'

const userStore = useUserStore()
const urlStore = useUrlStore()

const props = defineProps({
  publicId: {
    type: String,
    required: true
  }
})


const publicId = ref(props.publicId)

const post = await userStore
  .makeRequest(`${urlStore.apiUrl}/posts/${publicId.value}`, 'GET')
  .then((res) => res.json())

const timeElapsedHuman = timeSince(post.createdAt)
const humanReadableDate = new Date(post.createdAt).toLocaleString()

const author = post.author
const authorProfilePicture = getProfilePicture(author)

const community = post.community
const communityProfilePicture = getProfilePicture(community)

</script>

<template>
  <div class="post">
    <div class="post-header">
      <RouterLink class="post-header__community" :to="`/community/${post.community.name}`">
        <img :src="`${communityProfilePicture}`" alt="community image" />
        <span>{{ post.community.name }}</span>
      </RouterLink>

      <RouterLink class="post-header__user" :to="`/profile/${post.author.username}`">
        <img :src="authorProfilePicture" alt="user image" />
        <span>{{ post.author.username }}</span>
      </RouterLink>

      <span :title="humanReadableDate">{{ timeElapsedHuman }}</span>
    </div>

    <div class="post-body">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<style scoped>
.post {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  background-color: hsl(var(--primary-200) / 0.25);
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.post-header {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  border-bottom: 1px solid hsla(var(--primary-600), 0.5);

  .post-header__community,
  .post-header__user {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    background-color: hsl(var(--primary-200) / 0.5);
    padding: 0.25rem;
    border-radius: 5rem;
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

.post-body {
  h2 {
    font-weight: bold;
    font-size: 1.5rem;
  }

  p {
    white-space: pre-wrap;
    max-height: calc(1.5rem * 3);
    overflow: hidden;
    position: relative;
  }
}
</style>
