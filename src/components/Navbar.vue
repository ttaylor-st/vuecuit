<script lang="ts" setup>
// TODO: Use the Material Icons library.
import ProfileIcon from './icons/IconProfile.vue'
import HomeIcon from './icons/IconHome.vue'
import IconCollections from '@/components/icons/IconCollections.vue'
import IconNotifications from '@/components/icons/IconNotifications.vue'
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
    <router-link to="/about">
      <ProfileIcon />
    </router-link>
  </nav>
</template>

<style scoped>
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
      filter: blur(2rem);
      transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover::before {
      filter: blur(0);
      width: 2.5rem;
      background-color: hsla(var(--primary-800) / 0.25);
    }

    &.router-link-active::before {
      filter: blur(0);
      width: 2.5rem;
      background-color: hsla(var(--primary-800) / 0.5);
    }

    &.router-link-active:hover::before {
      filter: blur(0);
      background-color: hsla(var(--primary-800) / 0.75);
    }
  }
}
</style>
