import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useUrlStore } from '@/stores/urlStore'
import { useUserStore } from '@/stores/userStore'
import App from './App.vue'
import router from './router'

const DEFAULT_URL = 'http://192.168.1.54:80'
const USER_REFRESH_INTERVAL = 5000

function initializeApp(): ReturnType<typeof createApp> {
  const app = createApp(App)
  app.use(createPinia())
  app.use(router)
  app.provide('urlStore', useUrlStore())
  app.provide('userStore', useUserStore())
  return app
}

async function initializeStores(): Promise<void> {
  const localStorageUrl = localStorage.getItem('url')
  if (localStorageUrl) {
    useUrlStore().setBaseUrl(localStorageUrl)
  } else {
    useUrlStore().setBaseUrl(DEFAULT_URL)
    useUrlStore().setApiUrl(`${useUrlStore().url}/api`)
  }

  const localStorageToken = localStorage.getItem('csrfToken')
  if (localStorageToken) await useUserStore().setXcsrfToken(localStorageToken)
  await useUserStore().initial()
  await useUserStore().fetchUser()
}

function startUserRefresh(): void {
  setInterval(async () => {
    await useUserStore().fetchUser()
  }, USER_REFRESH_INTERVAL)
}

const app = initializeApp()
initializeStores()
startUserRefresh()
app.mount('#app')
