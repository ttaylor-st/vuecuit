<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import ArrowDownBold from 'vue-material-design-icons/ArrowDownBold.vue'
import ArrowUpBold from 'vue-material-design-icons/ArrowUpBold.vue'

import type { Comment } from '@/types/discuitTypes'
import { getProfilePicture, timeSince } from '@/lib/utils'
import Markdown from '@/components/Markdown.vue'
import { useUrlStore } from '@/stores/urlStore'

const userStore = useUserStore()
const urlStore = useUrlStore()
const router = useRouter()

const props = defineProps({
  comment: {
    type: Object as () => Comment,
    required: true
  },
  op: {
    type: String,
    required: false
  },
  isMock: {
    type: Boolean,
    required: false,
    default: false
  }
})

const timeElapsedHuman = timeSince(props.comment.createdAt)
const humanReadableDate = new Date(props.comment.createdAt).toLocaleString()
const comment = ref(props.comment)

async function vote(upvote: boolean) {
  const vote = {
    method: 'POST',
    data: {
      commentId: props.comment.id,
      up: upvote
    }
  }

  const children = props.comment.children
  const voteResult = await userStore.makeRequest(`${urlStore.apiUrl}/_commentVote`, vote)
  if (!voteResult || voteResult.status !== 200) return console.error('Failed to vote on comment')
  comment.value = voteResult.data
  comment.value.children = children
}
</script>

<template>
  <div
    class="embedded-comment"
    :class="{ 'is-op': comment.author?.id === op }"
    :style="{ paddingBottom: comment.children?.length ? '0' : '0.5rem' }"
    :id="`comment-${comment.id}`"
  >
    <div class="comment-header">
      <RouterLink
        @click.stop
        @keydown.stop
        class="comment-user"
        :to="`/profile/${comment.author?.username}`"
      >
        <img
          class="comment-user-icon"
          :src="comment.author ? getProfilePicture(comment.author) : ''"
          alt="User avatar"
        />
        <span class="comment-user-name">{{
          comment.author?.username || "Hidden"
        }}</span>
      </RouterLink>
      <span class="comment-date" :title="humanReadableDate">{{
        timeElapsedHuman
      }}</span>
    </div>
    <div class="comment-body">
      <Markdown :markdown="comment.body" />
    </div>

    <div class="comment-footer" v-if="!isMock">
      <div class="votes footer-pill" @click.stop>
        <button
          :class="{ votes__upvote: true, active: comment.userVotedUp }"
          @click="vote(true)"
        >
          <arrow-up-bold />
        </button>
        <span class="votes__count">{{
          comment.upvotes - comment.downvotes
        }}</span>
        <button
          :class="{
            votes__downvote: true,
            active: comment.userVoted && !comment.userVotedUp,
          }"
          @click="vote(false)"
        >
          <arrow-down-bold />
        </button>
      </div>
      <div class="footer-section">
        <button class="footer-pill">Reply</button>
        <button
          class="footer-pill"
          v-if="userStore.user?.id === comment.author?.id"
        >
          Edit
        </button>
      </div>
    </div>

    <div class="comment-replies" v-if="comment.children?.length">
      <EmbeddedComment
        v-for="reply in comment.children"
        :key="reply.id"
        :comment="reply"
        :op="op"
      />
    </div>
  </div>
</template>

<style scoped>
.embedded-comment {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  position: relative;
  background-color: hsl(var(--primary-100) / 1);
  padding: 0.5rem 0 0.5rem 0.5rem;
  border-radius: 0 0.5rem 0.5rem 0;
  transition: all 0.3s ease;

  &.is-op {
    .comment-user-name {
      color: hsla(var(--accent-900) / 1);
    }

    &::before {
      background-color: hsla(var(--accent-900) / 1);
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0.3rem;
    height: 100%;
    border-radius: 0.5rem;
    background-color: hsl(var(--primary-200) / 1);
  }
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 0.5rem;
}

.comment-user {
  display: flex;
  align-items: center;
}

.comment-user-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 0.5rem;
  background-color: hsl(var(--primary-200) / 1);
}

.comment-user-name {
  font-weight: bold;
  color: hsla(var(--primary-900) / 1);
}

.comment-date {
  font-size: 0.8rem;
}

.comment-body {
  margin-top: 0.5rem;
}

.comment-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 0.5rem;

  .footer-section {
    padding: 0.2rem;
    display: flex;
    gap: 0.5rem;
  }

  button {
    border: none;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: hsl(var(--primary-200) / 1);
    color: hsla(var(--primary-900) / 1);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: hsl(var(--primary-300) / 1);
    }
  }

  .votes {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .votes__count {
      font-weight: bold;
    }

    .votes__upvote,
    .votes__downvote {
      padding: 0.25rem;
      border-radius: 0.5rem;
      background-color: hsl(var(--primary-200) / 1);
      color: hsla(var(--primary-900) / 1);
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background-color: hsl(var(--primary-300) / 1);
      }

      &.active {
        background-color: hsla(var(--secondary-300) / 1);
      }
    }
  }
}

.comment-replies {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
