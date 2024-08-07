<script setup lang="ts">
import { useUrlStore } from '@/stores/urlStore'
import { useUserStore } from '@/stores/userStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { ref } from 'vue'

const urlStore = useUrlStore()
const userStore = useUserStore()
const settingsStore = useSettingsStore()

const csrfToken = ref(userStore.getCsrfToken)
const baseUrl = ref(urlStore.url)
const defaultUrl = urlStore.defaultUrl

const isDarkMode = ref(settingsStore.isDarkMode)
const theme = ref(settingsStore.getTheme)
const themes = [
  { name: 'Default', value: 'default' },
  { name: 'OLED', value: 'oled' }
]

const saveUrl = async (e: Event) => {
  e.preventDefault()

  if (!baseUrl.value || baseUrl.value === '') {
    return
  }

  const url = new URL(baseUrl.value)
  url.pathname = '/api/_initial'

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (response.status !== 200) {
    // TODO: Replace with non-default dialog
    alert('The API could not be reached. Please check the URL and try again.')
    return
  }

  urlStore.setBaseUrl(baseUrl.value)
  baseUrl.value = urlStore.url
}

const saveCsrfToken = async (e: Event) => {
  e.preventDefault()

  if (!csrfToken.value || csrfToken.value === '') {
    return
  }

  await userStore.setXcsrfToken(csrfToken.value)
  csrfToken.value = userStore.getCsrfToken
}

const changeTheme = async (to: string) => {
  settingsStore.setTheme(to.toLowerCase())
  theme.value = settingsStore.getTheme
}

const toggleDarkMode = async () => {
  settingsStore.toggleDarkMode()
  isDarkMode.value = settingsStore.isDarkMode
}
</script>

<template>
  <main>
    <h1>Settings</h1>
    <p>Configure Vuecuit to match your needs.</p>

    <section class="theme">
      <h2>Theme</h2>
      <p>Change the appearance of Vuecuit.</p>

      <div class="tabs tabs-inline">
        <button :class="{ active: isDarkMode }" @click="toggleDarkMode">
          Dark
        </button>
        <button :class="{ active: !isDarkMode }" @click="toggleDarkMode">
          Light
        </button>
      </div>

      <div class="theme-carousel" v-if="isDarkMode">
        <div
          v-for="thisTheme in themes"
          :key="thisTheme.value"
          :class="{
            'theme-carousel__item': true,
            active: thisTheme.value + `-theme` === theme,
          }"
          @click="changeTheme(thisTheme.value)"
        >
          <img
            :src="`/src/assets/img/themes/dark-${thisTheme.value}.png`"
            :alt="`${thisTheme.name} Theme`"
          />
          <p>{{ thisTheme.name }}</p>
        </div>
      </div>

      <div class="theme-carousel" v-else>
        <div
          v-for="thisTheme in themes"
          :key="thisTheme.value"
          :class="{
            'theme-carousel__item': true,
            active: thisTheme.value + `-theme` === theme,
          }"
          @click="changeTheme(thisTheme.value)"
        >
          <img
            :src="`/src/assets/img/themes/light-${thisTheme.value}.png`"
            :alt="`${thisTheme.name} Theme`"
          />
          <p>{{ thisTheme.name }}</p>
        </div>
      </div>
    </section>

    <section class="advanced">
      <h2>API Settings</h2>
      <p>Configure the API settings for Vuecuit.</p>

      <div class="warning">
        <p>
          We recommend that you use the default settings unless you know what
          you are doing.
        </p>
      </div>

      <form>
        <div class="form-group">
          <label for="base-url">Base URL</label>
          <input
            type="text"
            id="api-url"
            name="base-url"
            placeholder="https://api.example.com"
            v-model="baseUrl"
          />
        </div>

        <div class="form-actions">
          <button class="secondary" @click="baseUrl = defaultUrl" type="reset">
            Reset
          </button>
          <button @click="saveUrl" type="submit">Save</button>
        </div>
      </form>
    </section>

    <section class="advanced">
      <h2>Cookies</h2>
      <p>
        This section allows you to configure the cookies used by Vuecuit. In
        case signing in does not work, you can manually set the CSRF token and
        session ID.
      </p>

      <div class="warning">
        <p>
          We recommend that you use the default settings unless you know what
          you are doing.
        </p>
      </div>

      <form>
        <div class="form-group">
          <label for="csrftoken">CSRF Token</label>
          <input
            type="text"
            id="csrftoken"
            name="csrftoken"
            placeholder="csrf_token"
            v-model="csrfToken"
          />
        </div>

        <div class="form-actions">
          <button class="secondary" type="reset">Reset</button>
          <button type="submit" @click="saveCsrfToken">Save</button>
        </div>
      </form>
    </section>
  </main>
</template>

<style scoped>
button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.theme-carousel {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  overflow-x: auto;

  .theme-carousel__item {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    gap: 0.5rem;

    border-radius: 1rem;
    border: 2px solid hsla(var(--background-200) / 0.5);
    background-color: hsla(var(--background-200) / 0.5);

    &.active {
      background-color: hsla(var(--background-200) / 1);
      border: 2px solid hsla(var(--accent-200) / 1);

      p {
        background-color: hsla(var(--accent-200) / 1);
        opacity: 1;
        bottom: 0;
      }
    }

    img {
      max-height: 512px;
    }

    p {
      position: absolute;
      text-align: center;
      width: 100%;
      bottom: -3rem;
      padding: 0.5rem;
      opacity: 0;
      transition: 0.25s;
    }

    &:hover p {
      opacity: 1;
      bottom: 0;
      background-color: hsla(var(--background-200) / 1);
    }
  }
}
</style>
