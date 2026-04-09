<script setup lang="ts">
import type { OnboardingContext } from '~/machines/onboardingMachine'

const props = defineProps<{
  context: OnboardingContext
  isCommercial: boolean
}>()

const emit = defineEmits<{
  submit: [{ email: string; phone: string }]
  back: []
}>()

const email = ref(props.context.email)
const phone = ref(props.context.phone)

const isValid = computed(() => {
  if (!email.value.trim()) return false
  if (props.isCommercial && !phone.value.trim()) return false
  return true
})

function submit() {
  if (!isValid.value) return
  emit('submit', { email: email.value.trim(), phone: phone.value.trim() })
}
</script>

<template>
  <form @submit.prevent="submit">
    <h2 class="text-xl font-semibold mb-6">How can we reach you?</h2>

    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1" for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1" for="phone">
          Phone
          <span v-if="isCommercial" class="text-red-500">*</span>
          <span v-else class="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          id="phone"
          v-model="phone"
          type="tel"
          :required="isCommercial"
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <div class="mt-8 flex justify-between">
      <button type="button" class="px-6 py-2 rounded border hover:bg-gray-50" @click="emit('back')">
        Back
      </button>
      <button
        type="submit"
        class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        :disabled="!isValid"
      >
        Submit
      </button>
    </div>
  </form>
</template>
