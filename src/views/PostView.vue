<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useUrlStore } from '@/stores/urlStore'
import { ref, onMounted } from 'vue'
import PostComponent from "@/components/post/PostComponent.vue";
import EmbeddedComment from "@/components/comments/EmbeddedComment.vue";

const userStore = useUserStore()
const urlStore = useUrlStore()

const publicId = ref(useRoute().params.publicId)
const comments = ref([])

// TODO: Support nested comments
onMounted(async () => {
  const fetched = await userStore
      .makeRequest(`${urlStore.apiUrl}/posts/${publicId.value}/comments`, 'GET')
      .then((res) => res.json())
      .catch((err) => console.error(err))

  comments.value = fetched.comments;
})
</script>

<template>

  <div>
    <PostComponent :publicId="publicId" :post="post" :comments="comments" />
    <section class="comments">
      <EmbeddedComment v-for="comment in comments" :key="comment.id" :comment="comment" />
    </section>
  </div>

</template>

<style scoped>
.comments {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>