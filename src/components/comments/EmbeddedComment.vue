<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useUrlStore } from "@/stores/urlStore";
import { useRouter } from "vue-router";

import type { Comment } from "@/types/discuitTypes";
import {getProfilePicture, timeSince} from "@/lib/utils";
import {markdownToHtml} from "@/lib/markdown";

const userStore = useUserStore();
const urlStore = useUrlStore();
const router = useRouter();

const props = defineProps({
	comment: {
    type: Object as () => Comment,
    required: true,
  },
  op: {
    type: String,
    required: false,
  }
});

const timeElapsedHuman = timeSince(props.comment.createdAt);
const humanReadableDate = new Date(props.comment.createdAt).toLocaleString();

const body = computed(() => {
  return markdownToHtml(props.comment.body);
});

</script>

<template>

  <div class="embedded-comment" :class="{ 'is-op': comment.author?.id === op }" :style="{ paddingBottom: comment.children?.length ? '0' : '0.5rem' }">
    <div class="comment-header">
      <RouterLink @click.stop @keydown.stop
                  class="comment-user" :to="`/profile/${comment.author?.username}`">
        <img class="comment-user-icon" :src="comment.author ? getProfilePicture(comment.author) : ''" alt="User avatar" />
        <span class="comment-user-name">{{ comment.author?.username || "Hidden" }}</span>
      </RouterLink>
      <span class="comment-date" :title="humanReadableDate">{{ timeElapsedHuman }}</span>
    </div>
    <div class="comment-body" v-html="body"></div>

    <div class="comment-replies" v-if="comment.children?.length">
      <EmbeddedComment v-for="reply in comment.children" :key="reply.id" :comment="reply" :op="op" />
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

.comment-replies {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}


</style>