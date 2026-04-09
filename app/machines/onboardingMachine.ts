import { assign, setup } from 'xstate'

export interface OnboardingContext {
  firstName: string
  lastName: string
  customerType: 'residential' | 'commercial' | ''
  email: string
  phone: string
}

export type OnboardingEvent =
  | { type: 'SUBMIT_NAME'; firstName: string; lastName: string }
  | { type: 'SUBMIT_CUSTOMER_TYPE'; customerType: 'residential' | 'commercial' }
  | { type: 'SUBMIT_CONTACT'; email: string; phone: string }
  | { type: 'BACK' }

export const onboardingMachine = setup({
  types: {
    context: {} as OnboardingContext,
    events: {} as OnboardingEvent,
  },
  guards: {
    isCommercial: ({ context }) => context.customerType === 'commercial',
  },
}).createMachine({
  id: 'onboarding',
  initial: 'name',
  context: {
    firstName: '',
    lastName: '',
    customerType: '',
    email: '',
    phone: '',
  },
  states: {
    name: {
      on: {
        SUBMIT_NAME: {
          target: 'customerType',
          actions: assign(({ event }) => ({
            firstName: event.firstName,
            lastName: event.lastName,
          })),
        },
      },
    },
    customerType: {
      on: {
        SUBMIT_CUSTOMER_TYPE: {
          target: 'contact',
          actions: assign(({ event }) => ({
            customerType: event.customerType,
          })),
        },
        BACK: { target: 'name' },
      },
    },
    contact: {
      on: {
        SUBMIT_CONTACT: {
          target: 'complete',
          actions: assign(({ event }) => ({
            email: event.email,
            phone: event.phone,
          })),
        },
        BACK: { target: 'customerType' },
      },
    },
    complete: {
      type: 'final',
    },
  },
})
