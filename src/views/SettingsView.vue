<script setup lang="ts">
import { useUrlStore } from '@/stores/urlStore'
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'

const urlStore = useUrlStore()
const userStore = useUserStore()

const baseUrl = ref(urlStore.url)
const defaultUrl = urlStore.defaultUrl

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
</script>

<template>

  <main>

    <h1>Settings</h1>
    <p>Configure Vuecuit to match your needs. </p>

    <section>
      <h2>API Settings</h2>
      <p>Configure the API settings for Vuecuit.</p>

      <div class="warning">
        <p>We recommend that you use the default settings unless you know what you are doing.</p>
      </div>

      <form>
        <div class="form-group">
          <label for="base-url">Base URL</label>
          <input type="text" id="api-url" name="base-url"
            placeholder="https://api.example.com" v-model="baseUrl" />
        </div>
        
        <div class="form-actions">
          <button class="secondary" @click="baseUrl = defaultUrl"
                  type="reset">Reset</button>
          <button @click="saveUrl"
              type="submit">Save</button>
        </div>
      </form>

    </section>

  </main>

</template>

<style scoped>

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }


</style>