<script lang="ts" setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import TopBar from "@/components/TopBar.vue";
</script>

<template>
  <TopBar />
  <Navbar />
  <div style="margin-bottom: 4rem;"></div>

  <router-view v-slot="{ Component, route }">
      <transition mode="out-in" :name="route.meta.transition || 'slide-left'">
        <component :is="Component" :key="route.path" />
      </transition>
  </router-view>
</template>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.2s ease;
}

.slide-left-enter,
.slide-left-leave-to {
  transform: translateX(100%);
  opacity: 0;
  filter: blur(8px) brightness(0.5);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.2s ease;
}

.slide-right-enter,
.slide-right-leave-to {
  transform: translateX(-100%);
  opacity: 0;
  filter: blur(8px) brightness(0.5);
}
</style>
