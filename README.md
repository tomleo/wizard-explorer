# Wizard explorer

Build using:

- [xstate](https://github.com/statelyai/xstate/) framework for managing multi-state
  - [xstate docs](https://stately.ai/docs/)
  - [xstate API docs](https://www.jsdocs.io/package/xstate)

## Finite state automata

> A state machine is a model of computation that defines:
> 
> - A finite number of states.
> - Transitions between states triggered by specific events.
> - Rules for how the machine moves between states.
> 
> -- https://medium.com/@ignatovich.dm/state-machines-in-react-advanced-state-management-beyond-redux-33ea20e59b62

This model lends itself very well to multi-step forms aka form-wizards

- **actor** is a running process that can receive messages (events), send messages and change its behavior based on the messages it receives
- **snapshots** emitted state changes
- **context** how you store data in a state machine actor
- **input** is how initial data can be provided to a machine actor.
- **guards** are used to conditionally allow or disallow transitions

> State machines help us capture all the states, events and transitions between them. Using state machines makes it easier to find impossible states and spot undesirable transitions.
>
> State machines can help reduce complexity and improve maintainability by providing a structured way to manage state transitions and handle events.
>
> Additionally, state machines can be highly maintainable and offer a way to make very complex front-end processes much more manageable.
>
> -- https://stately.ai/docs/state-machines-and-statecharts

### xstate examples

- https://github.com/statelyai/xstate/blob/main/examples/workflow-new-patient-onboarding/main.ts
- https://github.com/statelyai/xstate/blob/main/examples/7guis-2-temperature-vue/src/tempMachine.ts
- https://github.com/statelyai/xstate/blob/main/examples/workflow-greeting/main.ts

