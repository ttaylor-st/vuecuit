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

const community = {
  name: post.value.communityName,
  proPic: post.value.communityProPic,
  banner: post.value.communityBannerImage,
  id: post.value.communityId
}
const communityProfilePicture = getProfilePicture(community)
</script>

<template>

  <div class="post-header">
    <RouterLink @click.stop @keydown.stop
      class="post-header__community" :to="`/community/${community.name}`">
      <img :src="`${communityProfilePicture}`" alt="community image" />
      <span>{{ community.name }}</span>
    </RouterLink>

    <RouterLink @click.stop @keydown.stop
                class="post-header__user" :to="`/profile/${post.author.username}`">
      <img :src="authorProfilePicture" alt="user image" />
      <span>{{ post.author.username }}</span>
    </RouterLink>

    <span class="post-header__date" :title="humanReadableDate">{{ timeElapsedHuman }}</span>

  </div>

</template>
