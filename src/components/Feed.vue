<script setup lang="ts">
import type {Post} from "@/types/discuitTypes";

const props = defineProps({
  item: {
    type: Object as () => Post | Comment,
    required: true
  },

})



</script>

<template>
  
</template>

<style scoped>

</style>