<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui'
import { useRouter } from 'vue-router'
import SendMessage from './SendMessage.vue'

const router = useRouter()

function closeDrawer() {
  router.push({
    path: '/',
  })
}
</script>

<template>
  <DialogRoot :modal="false">
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-30" />
      <DialogContent
        class="fixed right-0 top-0 z-50 h-full w-2/5 min-w-72 bg-white p-8 shadow-lg"
        @escape-key-down="
          event => {
            event.preventDefault()
            closeDrawer()
          }
        "
        @interact-outside="
          event => {
            return event.preventDefault()
          }
        "
      >
        <DialogTitle class="m-0 mb-8 text-[17px] font-semibold">
          Edit Node
        </DialogTitle>
        <SendMessage />
        <div class="mt-[25px] flex justify-end">
          <DialogClose as-child>
            <button
              @click="closeDrawer"
              class="inline-flex h-[35px] items-center justify-center rounded-lg px-[15px] text-sm font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none disabled:text-gray-400"
            >
              Complete
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
