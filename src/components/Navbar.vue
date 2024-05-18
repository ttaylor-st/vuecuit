<script lang="ts" setup>
// TODO: Use the Material Icons library.
import ProfileIcon from './icons/IconProfile.vue'
import HomeIcon from './icons/IconHome.vue'
import IconCollections from '@/components/icons/IconCollections.vue'
import IconNotifications from '@/components/icons/IconNotifications.vue'

import { useUrlStore } from '@/stores/urlStore'
import { useUserStore } from '@/stores/userStore'
import { computed } from 'vue'

const urlStore = useUrlStore()
const userStore = useUserStore()

const profilePicture = computed(() => {
  if (userStore.user) {
    return userStore.user.proPic.url === null
      ? `https://api.dicebear.com/8.x/identicon/svg?seed=${userStore.user.username}`
      : `${urlStore.url}/${userStore.user.proPic.url}`
  }
  return 'https://api.dicebear.com/8.x/identicon/svg?seed=guest'
})

const navLinks = [
  { name: 'Home', icon: HomeIcon, to: '/' },
  { name: 'Collections', icon: IconCollections, to: '/collections' },
  { name: 'Notifications', icon: IconNotifications, to: '/notifications' },
  { name: 'Profile', icon: ProfileIcon, to: `/profile/${userStore.user?.username}` }
]
</script>

<template>
  <nav class="bottom-nav">
    <router-link v-for="link in navLinks" :key="link.to" :to="link.to" class="nav-link">
      <component :is="link.icon" v-if="link.name !== 'Profile'" />
      <img v-if="link.name === 'Profile'" :src="profilePicture" alt="Profile Picture" />
      <span>{{ link.name }}</span>
    </router-link>
  </nav>
</template>

<style scoped>
@keyframes activate_icon {
  0% {
    transform: scale(1) rotate(0deg);
  }
  25% {
    transform: scale(1.1) rotate(20deg);
  }
  75% {
    transform: scale(1.1) rotate(-20deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 64px;

  display: flex;

  background-color: hsla(var(--background-100) / 0.6);
  backdrop-filter: blur(4px);

  border-top: 1px solid hsla(var(--text-200) / 0.5);
  z-index: 1000;

  a {
    position: relative;
    flex: 1;
    text-decoration: none;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: hsla(var(--text-800) / 0.75);
    filter: grayscale(100%);

    transition: 0.3s;

    span {
      position: absolute;
      bottom: -1.5rem;
      font-size: 0.6rem;
      opacity: 0;
      transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    img, svg {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
    }

    &.router-link-active {
      filter: grayscale(0);

      img,
      svg {
        scale: 1.25;
        animation: activate_icon 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      }

      span {
        opacity: 1;
        bottom: 4px;
      }

    }

    &:hover {
      background-color: hsla(var(--background-100) / 0.8);
    }

  }
}
</style>
