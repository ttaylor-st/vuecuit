<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useUrlStore } from '@/stores/urlStore'

import ArrowUpBold from 'vue-material-design-icons/ArrowUpBold.vue'
import ArrowDownBold from 'vue-material-design-icons/ArrowDownBold.vue'
import type { Post } from '@/types/discuitTypes'

const userStore = useUserStore()
const urlStore = useUrlStore()

const props = defineProps({
  post: {
    type: Object as () => Post,
    required: true
  }
})

const post = ref(props.post)

async function vote(upvote: boolean) {
  const vote = {
    method: 'POST',
    postId: post.value.id,
    up: upvote
  }

  await userStore.makeRequest(`${urlStore.apiUrl}/_postVote`, vote)
}
</script>

<template>

  <div class="post-footer">
    <div class="votes footer-pill" @click.stop>
      <button class="votes__upvote" @click="vote(true)">
        <arrow-up-bold />
      </button>
      <span class="votes__count">{{ post.upvotes - post.downvotes }}</span>
      <button class="votes__downvote" @click="vote(false)">
        <arrow-down-bold />
      </button>
    </div>

    <div class="comments footer-pill">
      <span>{{ post.noComments }} comment{{ post.noComments !== 1 ? 's' : '' }}</span>
    </div>

  </div>

</template>

<style scoped>

.post-footer {
  display: flex;
  gap: 0.5rem;
  align-items: stretch;
}

.footer-pill {
  user-select: none;
  padding: 0 1rem;
  background-color: hsla(var(--primary-200) / 0.5);
  border: 1px solid hsla(var(--primary-600) / 0.5);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 5000px;
  transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: hsla(var(--primary-200) / 0.75);
  }

  &:active {
    background-color: hsla(var(--primary-300) / 0.75);
    border: 1px solid hsla(var(--primary-600) / 1);
  }

}

.votes {
  padding: 0;

  button {
    background-color: hsla(var(--primary-600) / 0.5);
    border: none;
    border-radius: 50%;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);

    span {
      color: hsla(var(--primary-950) / 1);
    }

    &:hover {
      background-color: hsla(var(--primary-600) / 0.75);
    }
  }
}

</style>