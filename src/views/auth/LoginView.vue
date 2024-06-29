<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const error = ref(null)
const loading = ref(false)

const submitForm = async (event: Event) => {
  event.preventDefault()
  const formData = new FormData(event.target as HTMLFormElement)
  loading.value = true
  try {
    const login = await userStore.login(formData.get('username') as string, formData.get('password') as string)
    if (login.username) {
      await router.push('/')
    } else {
      error.value = 'Invalid username or password'
    }
  } catch (error) {
    loading.value = false
    console.error(error)
  }

  if (loading.value) {
    loading.value = false
  }
}
</script>

<template>
  <main>
    <h1>Login</h1>
    <p>Don't have an account? <a href="https://discuit.net/login">Sign up on Discuit</a></p>

    <form method="post" @submit="submitForm">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" required />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required />
      </div>

      <button type="submit" :disabled="loading">{{ loading ? 'Loading...' : 'Login' }}</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </main>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  padding: 1em 0;

  .form-group {
    margin-bottom: 1em;
    display: flex;
    flex-direction: column;

    &:last-child {
      margin-bottom: 0;
    }
  }

  button {
    padding: 0.5em 1em;
    background-color: hsla(var(--primary-200) / 1);
    color: white;
    border: none;
    border-radius: 0.25em;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: hsla(var(--primary-300) / 1);
    }
  }

  label {
    font-weight: bold;
    margin-bottom: 0;
  }

  input {
    padding: 0.5em;
    border: 1px solid hsla(var(--primary-200) / 1);
    border-radius: 1em;

    &:focus-visible{
      outline: none;
      border-color: hsla(var(--primary-300) / 1);
    }

    &:-webkit-autofill {
      background-color: hsla(var(--primary-200) / 0.5);
    }
  }
}
</style>
