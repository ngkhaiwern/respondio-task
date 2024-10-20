<script setup lang="ts">
import TheButton from '@/components/TheButton.vue'
import TheDialog from '@/components/TheDialog.vue'
import { VueFlow } from '@vue-flow/core'
import { useAutoReplyBotStore } from '@/stores/autoReplyBot'
import CustomNode from '@/components/CustomNode.vue'

const { nodes, edges } = useAutoReplyBotStore()
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges">
    <template #node-custom="customNodeProps">
      <CustomNode v-bind="customNodeProps" />
    </template>
  </VueFlow>
  <TheDialog></TheDialog>
</template>

<style>
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';
</style>
