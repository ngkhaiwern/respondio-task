import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDrawerStore = defineStore('drawer', () => {
  const isOpen = ref(false)
  return {
    isOpen,
  }
})
