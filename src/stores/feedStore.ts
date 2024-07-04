import { defineStore } from 'pinia'
import type { Post, Comment } from '@/types/discuitTypes'

type FeedItem = {
  type: string
  item: Post | Comment
}

type Feed = {
  items: FeedItem[]
  posts: Post[]
  next: string | null
  isFetching: boolean
  type: string
  sort: string
  username?: string
  communityId?: string
  userType?: string
  scrollPosition?: number
}

type FeedState = {
  [key: string]: Feed
}

export const useFeedStore = defineStore('feed', {
  state: (): FeedState => ({}),
  actions: {
    initializeFeed(
      feedKey: string,
      params: {
        type: string
        sort?: string
        username?: string
        communityId?: string
        userType?: string
      }
    ) {
      if (!this[feedKey]) {
        this[feedKey] = {
          items: [],
          posts: [],
          next: null,
          isFetching: false,
          type: params.type,
          sort: params.sort || 'hot',
          username: params.username,
          communityId: params.communityId,
          userType: params.userType || 'overview'
        }
      }
    },
    addUserFeedItems(feedKey: string, items: FeedItem[]) {
      if (this[feedKey]) {
        this[feedKey].items.push(...items)
      }
    },
    addPosts(feedKey: string, newPosts: Post[]) {
      if (this[feedKey]) {
        this[feedKey].posts.push(...newPosts)
      }
    },
    setNext(feedKey: string, next: string | null) {
      if (this[feedKey]) {
        this[feedKey].next = next
      }
    },
    setIsFetching(feedKey: string, isFetching: boolean) {
      if (this[feedKey]) {
        this[feedKey].isFetching = isFetching
      }
    },
    clearFeed(feedKey: string) {
      if (this[feedKey]) {
        this[feedKey].items = []
        this[feedKey].posts = []
        this[feedKey].next = null
      }
    },
    setScrollPosition(feedKey: string, scrollPosition: number) {
      if (scrollPosition < 250) return
      if (this[feedKey]) {
        this[feedKey].scrollPosition = scrollPosition
      }
    }
  }
})
