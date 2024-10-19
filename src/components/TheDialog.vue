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

const title = ref('')
const description = ref('')
const nodeType = ref('')

const isSubmitAllowed = computed(() => {
  return title.value && description.value && nodeType.value
})

const { addNodes } = useAutoReplyBotStore()

const createNode = () => {
  console.log('create node')
  addNodes([
    {
      id: Date.now().toString(),
      position: { x: 500, y: 100 },
      data: {
        label: 'initial',
      },
    },
  ])
  title.value = ''
  description.value = ''
  nodeType.value = ''
}
</script>

<template>
  <DialogRoot>
    <DialogTrigger
      class="text-grass11 hover:bg-mauve3 dark:focus:shadow-green8 fixed bottom-6 right-1/2 inline-flex h-[35px] items-center justify-center rounded-md border bg-white px-[15px] font-semibold leading-none shadow-sm focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
    >
      Create New Node
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay
        class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30"
      />
      <DialogContent
        class="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] z-[100] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
      >
        <DialogTitle class="text-mauve12 m-0 mb-8 text-[17px] font-semibold">
          Create New Node
        </DialogTitle>
        <fieldset class="mb-[15px] flex items-center gap-5">
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
        </fieldset>
        <div class="mt-[25px] flex justify-end">
          <DialogClose as-child>
            <button
              @click="createNode"
              :disabled="!isSubmitAllowed"
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
