<script lang="ts" setup>
import { ref } from 'vue'
import { useAutoReplyBotStore } from '@/stores/autoReplyBot'

const { editNodeFields: fieldsForEditing } = useAutoReplyBotStore()
</script>

<template>
  <fieldset class="mb-[15px] flex items-center gap-5">
    <label class="text-grass11 w-[90px] text-right text-sm" for="title">
      Title
    </label>
    <input
      v-model="fieldsForEditing.name"
      id="title"
      class="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-lg bg-stone-50 px-[10px] text-sm leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
      placeholder="Welcome Message"
    />
  </fieldset>
  <fieldset class="mb-[15px] flex items-center gap-5">
    <label class="text-grass11 w-[90px] text-right text-sm" for="description">
      Description
    </label>
    <input
      v-model="fieldsForEditing.description"
      id="description"
      class="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-lg bg-stone-50 px-[10px] text-sm leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
      placeholder="Description of this node"
    />
  </fieldset>
  <fieldset
    class="mb-[15px] flex items-center gap-5"
    v-for="time in fieldsForEditing.data.times"
    :key="time.day"
  >
    <label
      class="text-grass11 w-[90px] text-right text-sm capitalize"
      for="description"
    >
      {{ time.day }}
    </label>
    <input
      v-model="time.startTime"
      type="time"
      class="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-lg bg-stone-50 px-[10px] text-sm leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
      placeholder="Enter start time"
    />
    <input
      v-model="time.endTime"
      type="time"
      class="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-lg bg-stone-50 px-[10px] text-sm leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
      placeholder="Enter end time"
    />
  </fieldset>
</template>
