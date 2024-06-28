<script setup lang="ts">

import SmallProfile from "@/components/SmallProfile.vue";
import {useUserStore} from "@/stores/userStore";
import type {User} from "@/types/discuitTypes";
import {ref} from "vue";

const userStore = useUserStore()

const user = ref<User>()
userStore.fetchUser().then((res) => {
  user.value = res
})

const logout = async () => {
  await userStore.logout()
  if (userStore.error) console.error(userStore.error)
}

const time = new Date().getHours()
let greeting = ''
if (time < 12) greeting = 'Good morning, '
else if (time < 18) greeting = 'Good afternoon, '
else greeting = 'Good evening, '

</script>

<template>
  <main>

    <SmallProfile :user="user" :usernamePrefix="greeting" v-if="user" />
    <div v-else class="skeleton" style="width: 100%; height: 5rem;"></div>

    <hr>

    <div class="link-list">
      <RouterLink to="/settings">
        <h3>Settings</h3>
        <p>Change your settings</p>
      </RouterLink>
      <RouterLink to="/about">
        <h3>About</h3>
        <p>Learn more about Vuecuit</p>
      </RouterLink>
      <a v-if="user" @click="logout">
        <h3>Logout</h3>
        <p>Logout of your account</p>
      </a>
      <RouterLink v-else to="/login">
        <h3>Login</h3>
        <p>Login to your account</p>
      </RouterLink>
    </div>

    <hr>

    <div class="link-list">
      <a href="https://github.com/ttaylor-st/vuecuit">
        <h3>GitHub</h3>
        <p>View the source code</p>
      </a>
      <a href="https://discuit.net/" target="_blank">
        <h3>Discuit</h3>
        <p>Visit the Discuit website</p>
      </a>
    </div>

  </main>
</template>
