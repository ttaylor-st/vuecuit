<script lang="ts" setup>
import { ref } from 'vue'
import { useUrlStore } from '@/stores/urlStore'
import { useUserStore } from '@/stores/userStore'
import { useRoute } from 'vue-router'
import type { User, FeedItem } from '@/types/discuitTypes'
import PostComponent from '@/components/PostComponent.vue'
import { getProfilePicture } from '@/lib/utils'

const userStore = useUserStore()
const urlStore = useUrlStore()
const route = useRoute()

const user = ref<User>()
const joinTime = ref('')
const pronouns = ref([])

const username = route.params.username

const fetchedUser = await userStore.makeRequest(`${urlStore.apiUrl}/users/${username}`)
const fetchedUserBody = await fetchedUser.json()
const profilePicture = getProfilePicture(fetchedUserBody)
user.value = fetchedUserBody
joinTime.value = new Date(fetchedUserBody.createdAt).toLocaleDateString()
// pronouns.value = userStore.user.aboutMe.match(/(she|he|they)\/(her|him|them)/g) || []

const fetchedFeed = await userStore.makeRequest(`${urlStore.apiUrl}/users/${username}/feed`)
const fetchedFeedBody = await fetchedFeed.json()

const posts = ref([])
posts.value = fetchedFeedBody.items.filter((item: FeedItem) => item.type === 'post') || []
</script>

<template>
  <main>
    <section>
      <div class="profile">
        <div class="profile__header">
          <div class="profile__avatar">
            <img :src="profilePicture" alt="Profile Picture" />
          </div>
          <div class="profile__user">
            <h1>{{ user.username }}</h1>
            <div class="profile__stats">
              <span
                :class="{
                  'low-tier': user.points < 48,
                  'mid-tier': user.points >= 48 && user.points < 1000,
                  'high-tier': user.points >= 1000
                }"
              >
                {{ user.points === 1 ? '1 point' : `${user.points} points` }}
              </span>
              <span
                :class="{
                  'low-tier': user.noPosts < 10,
                  'mid-tier': user.noPosts >= 10 && user.noPosts < 50,
                  'high-tier': user.noPosts >= 50
                }"
              >
                {{ user.noPosts === 1 ? '1 post' : `${user.noPosts} posts` }}
              </span>
              <span
                :class="{
                  'low-tier': user.noComments < 24,
                  'mid-tier': user.noComments >= 24 && user.noComments < 100,
                  'high-tier': user.noComments >= 256
                }"
              >
                {{ user.noComments === 1 ? '1 comment' : `${user.noComments} comments` }}
              </span>
              <span>Joined {{ joinTime }}</span>
              <span v-for="pronoun in pronouns" :key="pronoun">{{ pronoun }}</span>
            </div>
            <p>{{ user.aboutMe }}</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2>{{ user.username }}'s posts</h2>
      <div class="posts">
        <PostComponent v-for="post in posts" :public-id="post.item.publicId" />
      </div>
    </section>

    <section>
      <h2>Things</h2>

      <div class="link-grid">
        <RouterLink to="/about">
          <div class="link-grid__item">
            <h3>About</h3>
            <p>Learn more about Vuecuit.</p>
          </div>
        </RouterLink>
        <RouterLink to="/settings">
          <div class="link-grid__item">
            <h3>Settings</h3>
            <p>Configure Vuecuit to your liking.</p>
          </div>
        </RouterLink>
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
