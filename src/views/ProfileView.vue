<script lang="ts" setup>
// TODO: Create a Comment component

import {ref, computed, watch} from 'vue'
import { useUrlStore } from '@/stores/urlStore'
import { useUserStore } from '@/stores/userStore'
import { useRoute } from 'vue-router'
import type { User, FeedItem } from '@/types/discuitTypes'
import PostComponent from '@/components/post/PostComponent.vue'
import { getProfilePicture } from '@/lib/utils'
import { markdownToHtml } from '@/lib/markdown'

const userStore = useUserStore()
const urlStore = useUrlStore()
const route = useRoute()

const selectedTab = ref('posts')
const loading = ref(false)

const username = ref(route.params.username)
const user = ref<User>()
const joinTime = ref('')
const userStats = computed(() => ({
  posts: 0,
  comments: 0,
  points: 0
}))
const pronouns = ref<string[]>([])
const profilePicture = ref<string>('')
const posts = ref<FeedItem[]>([])

const fetchUserData = async () => {
  const fetchedUser = await userStore.makeRequest(`${urlStore.apiUrl}/users/${username.value}`)
  const fetchedUserBody = await fetchedUser.json()
  userStats.value.points = fetchedUserBody.points
  userStats.value.posts = fetchedUserBody.noPosts
  userStats.value.comments = fetchedUserBody.noComments
  user.value = fetchedUserBody
  joinTime.value = new Date(fetchedUserBody.createdAt).toLocaleDateString()
  profilePicture.value = getProfilePicture(fetchedUserBody)
}

const fetchUserFeed = async () => {
  loading.value = true
  const filter = selectedTab.value === 'overview' ? '' : selectedTab.value
  const fetchedFeed = await userStore.makeRequest(`${urlStore.apiUrl}/users/${username.value}/feed?filter=${filter}`) || { json: () => [] }
  const fetchedFeedBody = await fetchedFeed.json()
  posts.value = fetchedFeedBody.items.filter((item: FeedItem) => item.type === 'post') || []
  loading.value = false
}

watch(selectedTab, () => {
  fetchUserFeed()
}, { immediate: true })

const formatStat = (key: string, value: number) => {
  if (key === 'posts') return `${value} post${value === 1 ? '' : 's'}`
  if (key === 'comments') return `${value} comment${value === 1 ? '' : 's'}`
  if (key === 'points') return `${value} point${value === 1 ? '' : 's'}`
  return ''
}

fetchUserData()
fetchUserFeed()
</script>

<template>
  <main>
    <section>
      <!-- Profile Section -->
      <div class="profile">
        <div class="profile__header">
          <div class="profile__avatar">
            <img :src="profilePicture" alt="Profile Picture" />
          </div>
          <div class="profile__user" v-if="user">
            <h1>{{ user.username }}</h1>
            <div class="profile__stats">
              <span v-for="(value, key) in userStats" :key="key">
                {{ formatStat(key, value) }}
              </span>
              <span>Joined {{ joinTime }}</span>
              <span v-for="pronoun in pronouns" :key="pronoun">{{ pronoun }}</span>
            </div>
            <p :innerHTML="markdownToHtml(user.aboutMe)" />
          </div>
        </div>
      </div>
    </section>

      <div class="tabs">
        <button v-for="tab in (['Posts', 'Comments', 'Overview'] || [])" :key="tab" @click="selectedTab = tab.toLowerCase()"
          :class="{ 'is-active': selectedTab === tab.toLowerCase() } ">
          {{ tab }}
        </button>
      </div>

    <section v-if="selectedTab === 'posts'">
      <h2>Posts</h2>
      <div v-if="loading">
        <p>Loading...</p>
      </div>
      <div v-else-if="posts.length > 0" class="posts">
        <PostComponent v-for="post in (posts || [])" :key="post.item.id" :public-id="post.item.publicId" />
      </div>
      <div v-else>
        <p>No posts to show.</p>
      </div>
    </section>

    <section v-else-if="selectedTab === 'comments'">
      <h2>Comments</h2>
      <div v-if="loading">
        <p>Loading...</p>
      </div>
      <div v-else-if="posts.length > 0" class="posts">
        <PostComponent v-for="post in (posts || [])" :key="post.item.id" :public-id="post.item.publicId" />
      </div>
      <div v-else>
        <p>No posts to show.</p>
      </div>
    </section>

    <section v-else>
      <h2>Overview</h2>
      <div v-if="posts.length > 0" class="posts">
        <PostComponent v-for="post in posts" :key="post.item.id" :public-id="post.item.publicId" />
      </div>
      <div v-else-if="loading">
        <p>Loading...</p>
      </div>
      <div v-else>
        <p>Nothing to show.</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
}

.profile__header {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 1rem;

  .profile__avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .profile__user {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .profile__stats {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      margin-bottom: 0.5rem;

      span {
        font-size: 0.8rem;
        background-color: hsla(var(--background-200) / 0.5);
        border: 1px solid transparent;
        padding: 0.15rem 0.5rem;
        border-radius: 69420px;
        user-select: none;
        transition: 0.2s;

        &:hover {
          background-color: hsla(var(--background-200) / 0.75);
          border: 1px solid hsl(var(--background-200));
        }

        &:active {
          background-color: hsla(var(--background-200) / 0.9);
          border: 1px solid hsl(var(--background-300));
        }
      }
    }

    h1 {
      margin: 0;
    }

    p {
      margin: 0;
      white-space: pre-wrap;
    }
  }
}

@media (max-width: 480px) {
  .profile__header {
    grid-template-columns: 1fr;
    gap: 1rem;

    .profile__avatar {
      height: 100px;
    }
  }
}
</style>
