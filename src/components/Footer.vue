<template>
  <footer>
    <div class="footer-content">
      <h2>Vuecuit</h2>
      <p><i>An open-source Discuit client</i></p>

      <div class="footer-links">
        <a href="https://github.com/ttaylor-st/vuecuit" rel="noopener" target="_blank">GitHub</a>
        <a href="https://discuit.net/vuecuit" rel="noopener" target="_blank">Discuit</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  width: calc(100% - 2rem);
  max-width: 768px;
  margin: 2rem auto 4rem auto;
  padding: 1rem;
  background-color: hsl(var(--background-100));
  color: hsl(var(--text-900));
  border-radius: 1rem;
}

.footer-links {
  display: flex;
  margin-top: 1rem;

  a {
    color: hsl(var(--text-900));
    text-decoration: none;
    font-weight: bold;

    &:not(:last-child):after {
      content: '/';
      color: hsla(var(--text-900) / 0.5);
      margin: 0 0.5rem;
    }

    &:hover {
      color: hsla(var(--text-900) / 0.8);
    }
  }
}
</style>
<script setup lang="ts"></script>
