import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUrlStore = defineStore('url', () => {
  const url = ref('https://discuit.net')
  const apiUrl = ref(`${url.value}/api`)
  const defaultUrl = 'https://discuit.net'

  const setBaseUrl = (newBaseUrl: string) => {
    url.value = newBaseUrl
    apiUrl.value = `${newBaseUrl}/api`
    localStorage.setItem('url', newBaseUrl)
  }

  const setApiUrl = (newApiUrl: string) => {
    apiUrl.value = newApiUrl
  }

  const loadUrls = () => {
    const localStorageUrl = localStorage.getItem('url')
    if (localStorageUrl) setBaseUrl(localStorageUrl)
    else setBaseUrl(defaultUrl)
  }

  return { url, apiUrl, defaultUrl, setBaseUrl, setApiUrl, loadUrls }
})
