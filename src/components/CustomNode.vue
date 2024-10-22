<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const router = useRouter()
const route = useRoute()

const isCurrentNode = computed(() => {
  if (route.params.id === props.data.id) {
    return true
  } else {
    return false
  }
})

function handleClick() {
  if (route.params.id === props.data.id) {
    router.push('/')
  } else {
    router.push(`/${props.data.id}`)
  }
}

type CustomData = {
  name: string
  id: string
  parentId: string
  type?: string
  description?: string
  data?: object
}
// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<CustomData>>()

const iconType = computed(() => {
  if (props.data.type === 'dateTime') {
    return 'mage:calendar'
  } else if (props.data.type === 'trigger') {
    return 'mage:electricity'
  } else if (props.data.type === 'sendMessage') {
    return 'iconamoon:send'
  } else if (props.data.type === 'addComment') {
    return 'mage:message-dots'
  } else {
    return 'mage:preview-circle'
  }
})
</script>

<template>
  <div
    :class="{ 'ring-2': isCurrentNode }"
    class="w-44 min-h-14 rounded-lg shadow-lg bg-stone-200 p-2"
    @click="handleClick"
  >
    <Handle type="target" :position="Position.Top" />
    <div class="flex gap-2">
      <Icon :icon="iconType" />
      <!-- <Icon icon="mdi-light:circle" /> -->
      <p class="text-xs font-medium">{{ props.data.name }}</p>
    </div>
    <p class="text-xs pt-2 line-clamp-2 text-ellipsis">
      {{ props.data.description }}
    </p>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
