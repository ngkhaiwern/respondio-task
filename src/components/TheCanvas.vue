<script setup lang="ts">
import { useAutoReplyBotStore } from '@/stores/autoReplyBot'

const { nodes, edges } = useAutoReplyBotStore()
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges"> </VueFlow>
</template>

<style>
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';
</style>
