<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useUrlStore } from "@/stores/urlStore";
import { useRouter } from "vue-router";

import type { Comment } from "@/types/discuitTypes";

const userStore = useUserStore();
const urlStore = useUrlStore();
const router = useRouter();

const loading = ref(true);
const props = defineProps({
	postPublicId: {
		type: String,
		required: true,
	},
	publicId: {
		type: String,
		required: true,
	},
});

const publicId = ref(props.publicId);
const comment = ref<Comment>();

onMounted(async () => {
	comment.value = await userStore
		.makeRequest(
			`${urlStore.apiUrl}/posts/${props.postPublicId}/comments/${publicId.value}`,
			"GET",
		)
		.then((res) => res.json())
		.catch((err) => console.error(err));

	loading.value = false;
});
</script>

<template>

  <div class="embedded-comment" v-if="!loading">
    <div class="comment-header">
      <div class="comment-user">
        <img class="comment-user-icon" :src="comment.user.profilePicture" alt="User profile picture">
        <span class="comment-user-name">{{ comment.user.username }}</span>
      </div>
      <span class="comment-date">{{ new Date(comment.createdAt).toLocaleDateString() }}</span>
    </div>
    <div class="comment-body" v-html="comment.body"></div>
  </div>

</template>

<style scoped>

</style>