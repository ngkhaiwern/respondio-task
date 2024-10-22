<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui'
import { useRoute, useRouter } from 'vue-router'
import SendMessage from './SendMessage.vue'
import AddComment from './AddComment.vue'
import BusinessHours from './BusinessHours.vue'
import { storeToRefs } from 'pinia'
import { useAutoReplyBotStore } from '@/stores/autoReplyBot'
import { computed, watch } from 'vue'

const autoReplyBotStore = useAutoReplyBotStore()

const { fieldsForEditing } = storeToRefs(autoReplyBotStore)
const { findNode, updateNodeData, removeNodes } = autoReplyBotStore

const router = useRouter()
const route = useRoute()

const currentNode = computed(() => {
  if (typeof route.params.id !== 'string') return
  return findNode(route.params.id)
})

watch(currentNode, () => {
  if (
    currentNode.value?.data.type === 'sendMessage' ||
    currentNode.value?.data.type === 'addComment' ||
    currentNode.value?.data.type === 'dateTime'
  ) {
    return
  }
  closeDrawer()
})

function closeDrawer() {
  router.push({
    path: '/',
  })
}

function saveChanges() {
  updateNodeData(fieldsForEditing.value.id, fieldsForEditing.value)
  closeDrawer()
}

function deleteNode() {
  removeNodes(fieldsForEditing.value.id)
  closeDrawer()
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
        <SendMessage v-if="currentNode?.data.type === 'sendMessage'" />
        <AddComment v-if="currentNode?.data.type === 'addComment'" />
        <BusinessHours
          v-if="
            currentNode?.data.type === 'dateTime' &&
            currentNode?.data.data.action === 'businessHours'
          "
        />
        <div class="mt-[25px] flex justify-end">
          <DialogClose as-child>
            <button
              @click="saveChanges"
              class="inline-flex h-[35px] items-center justify-center rounded-lg px-[15px] text-sm font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none disabled:text-gray-400"
            >
              Save
            </button>
          </DialogClose>
        </div>
        <div class="mt-[25px] flex">
          <DialogClose as-child>
            <button
              @click="deleteNode"
              class="inline-flex h-[35px] items-center justify-center rounded-lg px-[15px] text-sm font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none disabled:text-gray-400 bg-red-500"
            >
              Delete
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
