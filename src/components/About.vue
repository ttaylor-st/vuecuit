<script lang="ts" setup>
import AboutItem from './AboutItem.vue'
import ToolingIcon from './icons/IconTooling.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <AboutItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Tech Stack</template>

    Vuecuit is served and bundled with
    <a href="https://vitejs.dev/guide/features.html" rel="noopener" target="_blank">Vite</a>
    and built with <a href="https://v3.vuejs.org/" rel="noopener" target="_blank">Vue 3</a>. For
    testing, we use <a href="https://www.cypress.io/" rel="noopener" target="_blank">Cypress</a> and
    <a href="https://on.cypress.io/component" rel="noopener" target="_blank"
      >Cypress Component Testing</a
    >.

    <br />

    <h4>Other tools include:</h4>
    <ul>
      <li>
        <a href="https://pinia.vuejs.org/" rel="noopener" target="_blank">Pinia</a>
        for data management
      </li>
      <li>
        <a href="https://router.vuejs.org/" rel="noopener" target="_blank">Vue Router</a>
        for routing and navigation
      </li>
      <li>
        <a
          href="https://github.com/ttaylor-st/vuecuit/tree/main/package.json"
          rel="noopener"
          target="_blank"
        >
          Check out the package.json for more</a
        >
      </li>
    </ul>
  </AboutItem>

  <AboutItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

    Need help? Join the <a href="https://discuit.net/vuecuit">Discuit</a> community and make a post.
    You can also file an issue on our
    <a href="https://github.com/ttaylor-st/vuecuit/issues">GitHub</a>
    repository.
  </AboutItem>

  <AboutItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support Vuecuit</template>

    Vuecuit development is entirely volunteer-driven. If you would like to support us, please
    consider contributing by making a pull request, filing an issue, and/or sending us virtual
    cookies on our <a href="https://discuit.net/vuecuit">Discuit</a> community 🍪.
  </AboutItem>
</template>
