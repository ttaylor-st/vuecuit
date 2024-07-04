<script setup lang="ts">

import type {Community} from "@/types/discuitTypes";
import {computed} from "vue";
import {getProfilePicture} from "@/lib/utils";

const props = defineProps<{
  community: Community
}>()

const profilePicture = computed(() => props.community ? getProfilePicture(props.community) : '')


</script>

<template>

  <RouterLink :to="`/community/${community.name}`" class="community">
    <div class="community-header">
      <div class="community-icon">
        <img :src="profilePicture" alt="Community Icon" />
      </div>
      <div class="community-info">
        <h1>{{ community.name }}</h1>
        <p>{{ community.noMembers }} members</p>
      </div>
    </div>
  </RouterLink>

</template>

<style scoped>
  .community {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    background-color: hsla(var(--primary-100) / 1);
    border-radius: 0.5rem;
  }

  .community-header {
    display: flex;
    gap: 1rem;
  }

  .community-icon {
    min-width: 50px;
    height: 50px;
    aspect-ratio: 1/1;

    border-radius: 50%;
    overflow: hidden;
  }

  .community-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .community-info {
    display: flex;
    flex-direction: column;
  }

  .community-info h1 {
    font-size: 1.25rem;
  }

  .community-info p {
    font-size: 0.875rem;
  }

</style>