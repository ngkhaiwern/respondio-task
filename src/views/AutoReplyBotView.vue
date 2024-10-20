<script setup lang="ts">
import TheCanvas from '@/components/TheCanvas.vue'
import TheDrawer from '@/components/TheDrawer.vue'
import { ref } from 'vue'

const isEditingNode = ref(false)
</script>

<template>
  <div class="h-screen w-screen">
    <TheCanvas />
  </div>
  <TheDrawer v-model:open="isEditingNode" />
</template>
