<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from "@/stores/userStore";
import { useUrlStore } from "@/stores/urlStore";
import Community from "@/components/Community.vue";

const userStore = useUserStore()
const urlStore = useUrlStore()

const search = ref('')
const results = ref([])

const doSearch = async (query: string) => {
  if (!query) {
    results.value = []
    return
  }

  const response = await userStore.makeRequest(
    `${urlStore.apiUrl}/communities?q=${query}&limit=10`
  )

  results.value = response.data
}

</script>

<template>
  <div class="top-bar">
    <div class="hamburger" style="opacity: 0;">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-menu"
      >
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </div>
    <div class="search-bar">
      <input type="text" v-model="search" placeholder="Search..."
        @input="doSearch(search)" />
    </div>
  </div>

  <div class="search-backdrop" v-if="search"></div>

  <div class="search-results" v-if="search">
    <p>Search results for: {{ search }}</p>

    <div class="result-list">
      <div v-if="results.length === 0">No results found</div>
      <Community v-for="result in results" :key="result.id" :community="result"
        @click="search = ''" />
    </div>

  </div>

</template>

<style scoped>

.top-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  background-color: hsla(var(--primary-50) / 1);
  border-bottom: 1px solid hsla(var(--primary-500) / 0.2);
  z-index: 1000;
}

.hamburger {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  svg {
    cursor: pointer;
  }
}

.search-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;

  input {
    max-width: 5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 50rem;
    background-color: hsla(var(--primary-500) / 0.1);
    color: hsla(var(--primary-500) / 1);
    transition: all 0.2s ease;

    &:focus {
      max-width: 15rem;
      outline: none;
      background-color: hsla(var(--primary-500) / 0.2);
    }

    &:hover {
      background-color: hsla(var(--primary-500) / 0.2);
    }

  }

}

.search-results {
  position: fixed;
  top: 4rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 768px;
  max-height: 50vh;
  overflow-y: auto;
  padding: 1rem;
  z-index: 999;

  background-color: hsla(var(--primary-50) / 1);
  border-radius: 1rem;
  border: 1px solid hsla(var(--primary-500) / 0.2);
}

.result-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.search-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(8px) brightness(0.5);
  background-color: hsla(var(--background-50) / 0.5);
  z-index: 998;
}


</style>