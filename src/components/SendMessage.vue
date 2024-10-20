<script lang="ts" setup>
import { ref } from 'vue'
import { useAutoReplyBotStore } from '@/stores/autoReplyBot'

const { editNodeFields: fieldsForEditing } = useAutoReplyBotStore()

function handleAddMore() {
  if (addMoreType.value === 'text') {
    fieldsForEditing.data.payload.push({
      type: addMoreType.value,
    })
  } else {
    fieldsForEditing.data.payload.push({
      type: addMoreType.value,
      attachment:
        'https://fastly.picsum.photos/id/396/536/354.jpg?hmac=GmUosOuXb6nGkFhmTE-83i0ciQcaleMyvIyqzeFbW58',
    })
  }
}

function handleFileUpload(event: Event, index: number) {
  const file = (event.target as HTMLInputElement).files[0]
  if (file) {
    fieldsForEditing.data.payload[index].attachment = URL.createObjectURL(file)
  }
}

const addMoreType = ref('text')
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
      placeholder="Welcome Message"
    />
  </fieldset>
  <template v-for="(payload, index) in fieldsForEditing.data.payload">
    <template v-if="payload.type === 'text'">
      <fieldset class="mb-[15px] flex items-center gap-5">
        <label class="text-grass11 w-[90px] text-right text-sm" for="text">
          Text
        </label>
        <input
          v-model="payload.text"
          id="text"
          class="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-lg bg-stone-50 px-[10px] text-sm leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
          placeholder="Text message for customer"
        />
        <button
          @click="fieldsForEditing.data.payload.splice(index, 1)"
          class="font-bold rounded-full bg-blue-500 py-1 px-2"
        >
          remove
        </button>
      </fieldset>
    </template>
    <template v-else>
      <fieldset class="mb-[15px] flex items-center gap-5">
        <label
          class="text-grass11 w-[90px] text-right text-sm"
          for="attachment"
        >
          Attachment
        </label>
        <img class="h-32 w-32 object-cover" :src="payload.attachment" />
        <input
          type="file"
          accept=".jpg, image/jpeg"
          @change="event => handleFileUpload(event, index)"
        />
        <button
          @click="fieldsForEditing.data.payload.splice(index, 1)"
          class="font-bold rounded-full bg-blue-500 py-1 px-2"
        >
          remove
        </button>
      </fieldset>
    </template>
  </template>
  <div class="flex gap-4">
    <select
      v-model="addMoreType"
      class="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-lg bg-stone-50 px-[10px] text-sm leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
    >
      <option value="text">Text</option>
      <option value="attachment">Attachment</option>
    </select>
    <button
      @click="handleAddMore"
      class="font-bold rounded-full bg-blue-500 py-1 px-2"
    >
      Add more
    </button>
  </div>
</template>
