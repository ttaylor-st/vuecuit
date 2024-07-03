<script setup lang="ts">
import { useUrlStore } from '@/stores/urlStore'
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'

import type { Post } from '@/types/discuitTypes'
import ArrowDownBold from 'vue-material-design-icons/ArrowDownBold.vue'
import ArrowUpBold from 'vue-material-design-icons/ArrowUpBold.vue'

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
    data: {
      postId: post.value.id,
      up: upvote
    }
  }

  const voteResult = await userStore.makeRequest(`${urlStore.apiUrl}/_postVote`, vote)
  if (voteResult.status !== 200) return console.error('Failed to vote on post')
  post.value = voteResult.data
}
</script>

<template>

  <div class="post-footer">
    <div class="votes footer-pill" @click.stop>
      <button :class="{ 'votes__upvote': true, 'active': post.userVotedUp }"
              @click="vote(true)">
        <arrow-up-bold />
      </button>
      <span class="votes__count">{{ post.upvotes - post.downvotes }}</span>
      <button :class="{ 'votes__downvote': true, 'active': post.userVoted && !post.userVotedUp }"
              @click="vote(false)">
        <arrow-down-bold />
      </button>
    </div>

    <div class="comments footer-pill">
      <span>{{ post.noComments }} comment{{ post.noComments !== 1 ? 's' : '' }}</span>
    </div>

  </div>

</template>