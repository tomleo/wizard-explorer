<script setup lang="ts">
const { currentStep, context, isCommercial, isDone, send } = useOnboarding()

const steps = ['name', 'customerType', 'contact'] as const
const stepIndex = computed(() => steps.indexOf(currentStep.value as typeof steps[number]))
const stepLabel = computed(() => stepIndex.value + 1)
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-xl shadow p-8">

      <!-- Progress -->
      <div v-if="!isDone" class="flex gap-2 mb-8">
        <div
          v-for="(_, i) in steps"
          :key="i"
          class="h-1.5 flex-1 rounded-full transition-colors"
          :class="i <= stepIndex ? 'bg-blue-600' : 'bg-gray-200'"
        />
      </div>
      <p v-if="!isDone" class="text-xs text-gray-400 mb-6">Step {{ stepLabel }} of {{ steps.length }}</p>

      <!-- Steps -->
      <OnboardingStepName
        v-if="currentStep === 'name'"
        :context="context"
        @submit="send({ type: 'SUBMIT_NAME', ...$event })"
      />

      <OnboardingStepCustomerType
        v-else-if="currentStep === 'customerType'"
        :context="context"
        @submit="send({ type: 'SUBMIT_CUSTOMER_TYPE', ...$event })"
        @back="send({ type: 'BACK' })"
      />

      <OnboardingStepContact
        v-else-if="currentStep === 'contact'"
        :context="context"
        :is-commercial="isCommercial"
        @submit="send({ type: 'SUBMIT_CONTACT', ...$event })"
        @back="send({ type: 'BACK' })"
      />

      <!-- Complete -->
      <div v-else-if="isDone" class="text-center py-8">
        <div class="text-4xl mb-4">🎉</div>
        <h2 class="text-xl font-semibold mb-2">You're all set, {{ context.firstName }}!</h2>
        <p class="text-gray-500 text-sm">We'll be in touch at {{ context.email }}.</p>
      </div>

    </div>
  </div>
</template>
