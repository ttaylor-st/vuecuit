import type { Community, User } from '@/types/discuitTypes'
import { useUrlStore } from '@/stores/urlStore'

export function randomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

export function timeSince(postCreatedAt: Date): string {
  const postTime = new Date(postCreatedAt).getTime()
  const currentTime = new Date().getTime()
  const timeDifference = currentTime - postTime

  const seconds = Math.floor(timeDifference / 1000)

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  }

  for (const unit in intervals) {
    const value = Math.floor(seconds / intervals[unit])
    if (value >= 1) return `${value} ${unit}${value > 1 ? 's' : ''} ago`
  }
  return 'Just now'
}

export function getProfilePicture(target?: User | Community): string {
  const urlStore = useUrlStore()
  const baseUrl = urlStore.url
  const defaultPicUrl = 'https://api.dicebear.com/8.x/identicon/svg?seed='

  if (target) {
    if (target.proPic) return `${baseUrl}/${target.proPic.url}`
    return `${defaultPicUrl}${target.id}`
  }

  return `${defaultPicUrl}${randomString(10)}`
}
