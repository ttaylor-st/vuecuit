<script lang="ts" setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <Navbar />

  <router-view v-slot="{ Component, route }">
    <suspense>
      <transition mode="out-in" :name="route.meta.transition || 'slide-left'">
        <component :is="Component" :key="route.path" />
      </transition>
    </suspense>
  </router-view>

  <hr />
  <Footer />
</template>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s ease;
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
