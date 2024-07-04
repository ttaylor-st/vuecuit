import 'vue-material-design-icons/styles.css'
import './assets/css/main.scss'
import { useUrlStore } from '@/stores/urlStore'
import { useUserStore } from '@/stores/userStore'
import { useSettingsStore } from '@/stores/settingsStore'
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
  app.provide('settingsStore', useSettingsStore())
  return app
}

function initializeTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isFirstTime = settingsStore.isFirstTime;

  if (isFirstTime) {
    settingsStore.setFirstTime();
    if (prefersDark) settingsStore.toggleDarkMode();
  }

  const isDarkMode = settingsStore.isDarkMode;
  const theme = settingsStore.getTheme;

  if (appElement) {
    appElement.classList.add(isDarkMode ? 'dark' : 'light');
    appElement.classList.add(`${theme}`);
  }
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

const app = initializeApp();
const settingsStore = useSettingsStore();
const appElement = document.getElementById('app');

initializeStores();
startUserRefresh();
initializeTheme();
app.mount('#app');

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  settingsStore.toggleDarkMode();
});
