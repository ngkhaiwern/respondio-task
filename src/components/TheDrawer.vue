<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui'
import { useAutoReplyBotStore } from '@/stores/autoReplyBot'
import { useRoute, useRouter } from 'vue-router'

const { findNode } = useAutoReplyBotStore()

const route = useRoute()
const router = useRouter()

const node = computed(() => {
  if (typeof route.params.id !== 'string') return
  return findNode(route.params.id)
})

const createNode = () => {
  router.push({
    path: '/',
  })
}

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
        <div>computed{{ node }}</div>
        <!-- <fieldset class="mb-[15px] flex items-center gap-5">
          <label class="text-grass11 w-[90px] text-right text-sm" for="title">
            Title
          </label>
          <input
            v-model="title"
            id="title"
            class="text-grass11 shadow-green7 focus:shadow-green8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-lg bg-stone-50 px-[10px] text-sm leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            placeholder="Welcome Message"
          />
        </fieldset>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label
            class="text-grass11 w-[90px] text-right text-sm"
            for="description"
          >
            Description
          </label>
          <input
            v-model="description"
            id="description"
            class="text-grass11 shadow-green7 focus:shadow-green8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-lg bg-stone-50 px-[10px] text-sm leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            placeholder="Welcome message for the customer."
          />
        </fieldset>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label
            class="text-grass11 w-[90px] text-right text-sm"
            for="nodeType"
          >
            Type of Node
          </label>
          <select
            v-model="nodeType"
            id="nodeType"
            class="text-grass11 shadow-green7 focus:shadow-green8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-lg bg-stone-50 px-[10px] text-sm leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
          >
            <option value="sendMessage">Send Message</option>
            <option value="addComment">Add Comments</option>
            <option value="businessHours">Business Hours</option>
          </select>
        </fieldset> -->
        <div class="mt-[25px] flex justify-end">
          <DialogClose as-child>
            <button
              @click="closeDrawer"
              class="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-lg px-[15px] text-sm font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none disabled:text-gray-400"
            >
              Complete
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
