<script setup lang="ts">
import type { OnboardingContext } from '~/machines/onboardingMachine'

const props = defineProps<{
  context: OnboardingContext
}>()

const emit = defineEmits<{
  submit: [{ firstName: string; lastName: string }]
}>()

const firstName = ref(props.context.firstName)
const lastName = ref(props.context.lastName)

function submit() {
  if (!firstName.value.trim() || !lastName.value.trim()) return
  emit('submit', { firstName: firstName.value.trim(), lastName: lastName.value.trim() })
}
</script>

<template>
  <form @submit.prevent="submit">
    <h2 class="text-xl font-semibold mb-6">What's your name?</h2>

    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1" for="firstName">First Name</label>
        <input
          id="firstName"
          v-model="firstName"
          type="text"
          required
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1" for="lastName">Last Name</label>
        <input
          id="lastName"
          v-model="lastName"
          type="text"
          required
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <div class="mt-8 flex justify-end">
      <button
        type="submit"
        class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        :disabled="!firstName.trim() || !lastName.trim()"
      >
        Next
      </button>
    </div>
  </form>
</template>
