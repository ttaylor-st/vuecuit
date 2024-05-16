import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUrlStore = defineStore('url', () => {
  const url = ref('https://discuit.net')
  const apiUrl = ref(`${url.value}/api`)

  const setBaseUrl = (newBaseUrl: string) => {
    url.value = newBaseUrl
    apiUrl.value = `${newBaseUrl}/api`
  }

  const setApiUrl = (newApiUrl: string) => {
    apiUrl.value = newApiUrl
  }

  return { url, apiUrl, setBaseUrl, setApiUrl }
})
