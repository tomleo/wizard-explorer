import { useMachine } from '@xstate/vue'
import { onboardingMachine } from '~/machines/onboardingMachine'

export function useOnboarding() {
  const { snapshot, send } = useMachine(onboardingMachine)

  const currentStep = computed(() => snapshot.value.value)
  const context = computed(() => snapshot.value.context)
  const isCommercial = computed(() => context.value.customerType === 'commercial')
  const isDone = computed(() => snapshot.value.status === 'done')

  return {
    currentStep,
    context,
    isCommercial,
    isDone,
    send,
  }
}
