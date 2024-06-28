<script setup lang="ts">
import { defineProps, ref } from 'vue'

const imageLoaded = ref(false)

const props = defineProps<{
  src: string,
  alt?: string,
  loading?: 'lazy' | 'eager'
}>()

let loading = props.loading || 'lazy'
if (loading !== 'lazy' && loading !== 'eager') loading = 'lazy'
</script>

<template>

  <div class="discuit-image">
    <img
      :src="props.src"
      :alt="props.alt"
      :loading="loading"
      @load="imageLoaded = true"
    />
    <div
      v-if="!imageLoaded"
      class="skeleton"
    ></div>
  </div>

</template>

<style scoped>

.discuit-image {
  position: relative;
  width: 100%;
  height: 200px;
}

.discuit-image .skeleton {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
}

</style>