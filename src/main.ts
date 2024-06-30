import 'vue-material-design-icons/styles.css'
import './assets/css/main.scss'
import { useUrlStore } from '@/stores/urlStore'
import { useUserStore } from '@/stores/userStore'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { App as CapacitorApp } from '@capacitor/app'

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
  const localStorageToken = localStorage.getItem('csrfToken')
  if (localStorageToken) await useUserStore().setXcsrfToken(localStorageToken)
  useUrlStore().loadUrls()
  await useUserStore().initial()
  await useUserStore().fetchUser()
}

function startUserRefresh(): void {
  setInterval(async () => {
    await useUserStore().fetchUser()
  }, USER_REFRESH_INTERVAL)
}

void CapacitorApp.addListener('backButton', ({canGoBack}) => {
  if (!canGoBack) void CapacitorApp.exitApp();
  else window.history.back();
});

const app = initializeApp()
initializeStores()
startUserRefresh()
app.mount('#app')
