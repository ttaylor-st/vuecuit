<script lang="ts" setup>
// TODO: Merge CSS of `ProfileView` and `CommunityView`

import { onMounted, ref } from 'vue'
import { useUrlStore } from '@/stores/urlStore'
import { useUserStore } from '@/stores/userStore'
import { useRoute } from 'vue-router'
import { getProfilePicture } from '@/lib/utils'
import Feed from "@/components/feed/Feed.vue";

const userStore = useUserStore()
const urlStore = useUrlStore()
const route = useRoute()

const communityName = route.params.community
const community = ref({})
const createdTime = ref('')
const profilePicture = ref('')
const loading = ref(true)

onMounted(async () => {

  const fetchedCommunity = await userStore.makeRequest(
    `${urlStore.apiUrl}/communities/${communityName}?byName=true`
  )
  const fetchedCommunityBody = await fetchedCommunity.json()
  community.value = fetchedCommunityBody
  createdTime.value = new Date(fetchedCommunityBody.createdAt).toLocaleDateString()

  profilePicture.value = getProfilePicture(fetchedCommunityBody)

  loading.value = false
})

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
            <h1>{{ community.name }}</h1>
            <div class="profile__stats">
              <span
                :class="{
                  'low-tier': community.noMembers < 48,
                  'mid-tier': community.noMembers >= 48 && community.noMembers < 1000,
                  'high-tier': community.noMembers >= 1000
                }"
              >
                {{ community.noMembers === 1 ? '1 member' : `${community.noMembers} members` }}
              </span>

              <span>Created {{ createdTime }}</span>
            </div>
            <p>{{ community.about }}</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2>Posts</h2>
      <Feed :community-id="community.id" :type="'community'" v-if="!loading" />
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
