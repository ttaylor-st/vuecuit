<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useUrlStore } from '@/stores/urlStore'
import { ref, onMounted } from 'vue'
import PostComponent from "@/components/post/PostComponent.vue";
import EmbeddedComment from "@/components/comments/EmbeddedComment.vue";
import type {Post} from "@/types/discuitTypes";

const userStore = useUserStore()
const urlStore = useUrlStore()

const publicId = ref(useRoute().params.publicId)
const post = ref<Post>()
const comments = ref([])
const commentCount = ref(0)

function buildComments(comments, parentId = null) {
  return comments
    .filter(comment => comment.parentId === parentId)
    .map(comment => ({
      ...comment,
      children: buildComments(comments, comment.id)
    }));
}

onMounted(async () => {
  const fetchedComments = await userStore
      .makeRequest(`${urlStore.apiUrl}/posts/${publicId.value}/comments`, 'GET')
      .then((res) => res.data)
      .catch((err) => console.error(err))

  const fetchedPost = await userStore
      .makeRequest(`${urlStore.apiUrl}/posts/${publicId.value}`, 'GET')
      .then((res) => res.data)
      .catch((err) => console.error(err))

  comments.value = buildComments(fetchedComments.comments);
  commentCount.value = fetchedComments.comments.length;
  post.value = fetchedPost;

  if (window.location.hash) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const comment = document.getElementById(window.location.hash.slice(1));
    if (comment) comment.scrollIntoView({ behavior: 'smooth' });
  }
})

window.addEventListener('hashchange', () => {
  const comment = document.getElementById(window.location.hash.slice(1));
  if (comment) comment.scrollIntoView({behavior: 'smooth'});
});
</script>

<template>

  <div style="padding: 1rem;">
    <PostComponent :publicId="publicId" :post="post" :comments="comments" :full-body="true"/>
    <section class="comments">
      <h2>{{ commentCount }} Comments</h2>
      <EmbeddedComment v-for="comment in comments" :key="comment.id" :comment="comment" :op="post.author.id" />
    </section>
  </div>

</template>

<style scoped>
.comments {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}
</style>