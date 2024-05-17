<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useUrlStore } from '@/stores/urlStore'
import PostHeader from '@/components/post/PostHeader.vue'
import PostBody from '@/components/post/PostBody.vue'

const userStore = useUserStore()
const urlStore = useUrlStore()

const props = defineProps({
  publicId: {
    type: String,
    required: true
  }
})


const publicId = ref(props.publicId)

const post = await userStore
  .makeRequest(`${urlStore.apiUrl}/posts/${publicId.value}`, 'GET')
  .then((res) => res.json())

</script>

<template>
  <div class="post">

    <PostHeader :post="post" />
    <PostBody :post="post" />


  </div>
</template>

<style scoped>
.post {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  background-color: hsl(var(--primary-200) / 0.25);
  padding: 0.5rem;
  border-radius: 0.5rem;
}
</style>
