<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()
import type { Comment } from '@/types/discuitTypes.ts'
import EmbeddedComment from '@/components/comments/EmbeddedComment.vue'

const user = userStore.user

const props = defineProps({
  body: String
})

const fakeComment: Comment = {
  body: props.body || 'This is a comment',
  communityId: '1',
  author: user,

  id: '1',
  postId: '1',
  postPublicId: '1',
  communityName: 'fakeCommunity',
  userId: user.id,
  username: user.username,
  userGroup: 'normal',
  userDeleted: false,
  parentId: null,
  depth: 0,
  noReplies: 0,
  noDirectReplies: 0,
  ancestors: null,
  upvotes: 0,
  downvotes: 0,
  createdAt: new Date(),
  editedAt: null,
  contentStripped: false,
  deleted: false,
  deletedAt: null,
  deletedAs: undefined,
  isAuthorMuted: false,
  userVoted: null,
  userVotedUp: null,
  postTitle: 'fakePost',
  postDeleted: false,
  postDeletedAs: undefined,

  children: []
}
</script>

<template>
  <EmbeddedComment :comment="fakeComment" :is-mock="true" />
</template>
