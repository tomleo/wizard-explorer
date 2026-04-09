<script setup lang="ts">
import type { OnboardingContext } from '~/machines/onboardingMachine'

const props = defineProps<{
  context: OnboardingContext
}>()

const emit = defineEmits<{
  submit: [{ customerType: 'residential' | 'commercial' }]
  back: []
}>()

const customerType = ref<'residential' | 'commercial' | ''>(props.context.customerType)

function submit() {
  if (!customerType.value) return
  emit('submit', { customerType: customerType.value })
}
</script>

<template>
  <form @submit.prevent="submit">
    <h2 class="text-xl font-semibold mb-6">What type of customer are you?</h2>

    <div class="space-y-3">
      <label class="flex items-center gap-3 p-4 border rounded cursor-pointer hover:bg-gray-50" :class="{ 'border-blue-500 bg-blue-50': customerType === 'residential' }">
        <input
          v-model="customerType"
          type="radio"
          value="residential"
          class="accent-blue-600"
        />
        <div>
          <div class="font-medium">Residential</div>
          <div class="text-sm text-gray-500">Personal or home use</div>
        </div>
      </label>

      <label class="flex items-center gap-3 p-4 border rounded cursor-pointer hover:bg-gray-50" :class="{ 'border-blue-500 bg-blue-50': customerType === 'commercial' }">
        <input
          v-model="customerType"
          type="radio"
          value="commercial"
          class="accent-blue-600"
        />
        <div>
          <div class="font-medium">Commercial</div>
          <div class="text-sm text-gray-500">Business or organisation</div>
        </div>
      </label>
    </div>

    <div class="mt-8 flex justify-between">
      <button type="button" class="px-6 py-2 rounded border hover:bg-gray-50" @click="emit('back')">
        Back
      </button>
      <button
        type="submit"
        class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        :disabled="!customerType"
      >
        Next
      </button>
    </div>
  </form>
</template>
