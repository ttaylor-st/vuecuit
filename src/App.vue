<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <Navbar />

  <router-view v-slot="{ Component, route }">
    <transition>
      <suspense v-if="route.meta.wait" :key="route.meta.layout">
        <component :is="Component" :key="route.path" />
      </suspense>
      <suspense v-else>
        <component :is="Component" :key="route.path" />
      </suspense>
    </transition>
  </router-view>

  <hr />
  <Footer />
</template>

<style scoped></style>
