<script setup lang="ts">
import TheCanvas from '@/components/TheCanvas.vue'
import TheDrawer from '@/components/TheDrawer.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isEditingNode = computed(() => {
  return !!route.params.id
})
</script>

<template>
  <RouterLink :to="{ name: 'auto-reply-bot-with-drawer', params: { id: '1' } }">
    <button>goto id 1</button>
  </RouterLink>
  <div class="h-screen w-screen">
    <TheCanvas />
  </div>
  <TheDrawer v-model:open="isEditingNode" />
</template>
