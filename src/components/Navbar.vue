<script lang="ts" setup>
// TODO: Use the Material Icons library.
import ProfileIcon from './icons/IconProfile.vue'
import HomeIcon from './icons/IconHome.vue'
import IconCollections from '@/components/icons/IconCollections.vue'
import IconNotifications from '@/components/icons/IconNotifications.vue'

import { useUrlStore } from '@/stores/urlStore'
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'

const urlStore = useUrlStore()
const userStore = useUserStore()

const profilePicture = ref('')

if (userStore.user) {
  profilePicture.value = `${urlStore.url}/${userStore.user.proPic.url}`
}

</script>

<template>
  <nav class="bottom-nav">
    <router-link to="/">
      <HomeIcon />
    </router-link>
    <router-link to="/notifications">
      <IconNotifications />
    </router-link>
    <router-link to="/collections">
      <IconCollections />
    </router-link>
    <router-link to="/profile">
      <img v-if="userStore.user" :src="profilePicture" alt="Profile Picture" />
      <ProfileIcon v-else />
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
  min-height: 50px;

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
    align-items: center;
    justify-content: center;

    transition: 0.3s;

    img {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
    }

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0;
      aspect-ratio: 1;
      border-radius: 50%;
      background-color: transparent;
      transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover::before {
      width: 2.5rem;
      background-color: hsla(var(--primary-800) / 0.25);
    }

    &.router-link-active {
      animation: activate_icon 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &.router-link-active::before {
      width: 2.5rem;
      background-color: hsla(var(--primary-800) / 0.5);
    }

    &.router-link-active:hover::before {
      background-color: hsla(var(--primary-800) / 0.75);
    }
  }
}
</style>
