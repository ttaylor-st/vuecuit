<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useUrlStore } from "@/stores/urlStore";
import { useRouter } from "vue-router";

import type { Comment } from "@/types/discuitTypes";
import {timeSince} from "@/lib/utils";
import {markdownToHtml} from "@/lib/markdown";

const userStore = useUserStore();
const urlStore = useUrlStore();
const router = useRouter();

const props = defineProps({
	comment: {
    type: Object as () => Comment,
    required: true,
  },
});

const timeElapsedHuman = timeSince(props.comment.createdAt);
const humanReadableDate = new Date(props.comment.createdAt).toLocaleString();

const body = computed(() => {
  return markdownToHtml(props.comment.body);
});

</script>

<template>

  <div class="embedded-comment">
    <div class="comment-header">
      <div class="comment-user">
        <img class="comment-user-icon" :src="comment.author.proPic?.url" alt="User profile picture">
        <span class="comment-user-name">{{ comment.author.username }}</span>
      </div>
      <span class="comment-date" :title="humanReadableDate">{{ timeElapsedHuman }}</span>
    </div>
    <div class="comment-body" v-html="body"></div>
  </div>

</template>

<style scoped>

.embedded-comment {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  background-color: hsl(var(--primary-200) / 0.25);
  border: 1px solid transparent;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
}

.comment-user-name {
  font-weight: bold;
}

.comment-date {
  font-size: 0.8rem;
}

.comment-body {
  margin-top: 0.5rem;
}



</style>