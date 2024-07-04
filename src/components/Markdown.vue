<script setup lang="ts">

const props = defineProps({
  markdown: {
    type: String,
    required: true,
  }
});

import { markdownToHtml } from "@/lib/markdown";
import {onMounted, ref} from "vue";
const html = ref<string | null>(null);

onMounted(() => {
  html.value = markdownToHtml(props.markdown);
});

</script>

<template>
  <div v-html="html" />
</template>

<style scoped>

</style>