<script setup lang="ts">
import { defineProps, ref } from 'vue'

const imageLoaded = ref(false)
const lightboxOpen = ref(false)

const props = defineProps<{
  src: string,
  alt?: string,
  loading?: 'lazy' | 'eager'
}>()

let loading = props.loading || 'lazy'
if (loading !== 'lazy' && loading !== 'eager') loading = 'lazy'

const toggleLightbox = () => {
  lightboxOpen.value = !lightboxOpen.value
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') lightboxOpen.value = false
})


</script>

<template>
  <div class="discuit-image">
    <img
      :src="props.src"
      :alt="props.alt"
      :loading="loading"
      @load="imageLoaded = true"
      @click="toggleLightbox"
    />
    <div v-if="!imageLoaded" class="skeleton"></div>
    <div v-if="lightboxOpen" class="lightbox" @click="toggleLightbox" @keydown.enter="toggleLightbox" role="button">
      <img :src="props.src" :alt="props.alt" class="lightbox-img"/>
    </div>
  </div>
</template>

<style scoped>
.discuit-image {
  position: relative;
  width: 100%;
  max-height: 768px;
}

.discuit-image .skeleton {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
}

.lightbox {
  opacity: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s;
}

.lightbox-img {
  max-width: 90%;
  max-height: 90%;
}
</style>