# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm run generate     # Static site generation
npm run preview      # Preview production build
npm run test         # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:nuxt    # Run only Nuxt environment tests
```

Linting is provided by `@nuxt/eslint` — run via `npx eslint .` or configure your editor.

## Architecture

This is a **Nuxt 4** app (Vue 3 + TypeScript) for building multi-step form wizards using **XState v5** finite state machines.

**Key architectural concept:** Form wizard flows are modeled as XState state machines. Each step in the wizard corresponds to a state; transitions between steps are triggered by events; guards conditionally allow or block transitions; context stores the accumulated form data; input provides initial data to the machine.

**Tech stack:**
- **XState v5 + `@xstate/vue`** — state machine actors consumed via Vue composables (`useActor`, `useMachine`)
- **Pinia** — supplementary global state store (via `@pinia/nuxt`)
- **Tailwind CSS** — styling (via `@nuxtjs/tailwindcss`)
- **`@nuxt/icon`** — icon system
- **`@nuxt/image`** — optimized images
- **`@nuxtjs/i18n`** — internationalization
- **`@nuxtjs/mcp-toolkit`** — MCP integration

**File layout (Nuxt 4 convention):**
- `app/` — all application source (components, pages, composables, stores go here)
- `test/nuxt/` — Nuxt environment tests (`*.test.ts` / `*.spec.ts`), run with `happy-dom`
- `nuxt.config.ts` — module registration and Nuxt config

**Testing:** Vitest with `@nuxt/test-utils`. Nuxt-specific tests live in `test/nuxt/` and run in the `nuxt` vitest project with `happy-dom`. To run a single test file: `npx vitest test/nuxt/my-file.test.ts`.

