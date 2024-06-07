<script setup lang="ts">
import { ref, computed } from 'vue'
import type { User } from "@/types/discuitTypes"
import { getProfilePicture } from "@/lib/utils"
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  user: {
    type: Object as () => User,
    required: true
  }
})

const isLoading = ref(true)

const user = ref<User | null>(null)
const profilePicture = computed(() => user.value ? getProfilePicture(user.value) : '')

const openProfile = () => {
  if (user.value) {
    router.push(`/profile/${user.value.username}`)
  }
}

user.value = props.user
isLoading.value = false
</script>

<template>
  <div
      v-if="isLoading"
      class="small-profile skeleton"
  >
    <div class="small-profile__picture skeleton__picture"></div>
    <div class="small-profile__info">
      <div class="skeleton__username"></div>
      <div class="skeleton__action-text"></div>
    </div>
  </div>

  <div
      v-else
      class="small-profile"
      @click="openProfile"
      @keydown.enter="openProfile"
      tabindex="0"
      role="button"
  >
    <div class="small-profile__picture">
      <img :src="profilePicture" alt="Profile Picture" class="small-profile__picture" />
    </div>
    <div class="small-profile__info">
      <h3 class="small-profile__username">{{ user?.username }}</h3>
      <p class="small-profile__action-text">Open profile page</p>
    </div>
  </div>
</template>

<style scoped>


</style>


