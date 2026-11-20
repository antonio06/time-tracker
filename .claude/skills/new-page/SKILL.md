---
name: new-page
description: Scaffold a new page in time-tracker following the project's page anatomy (api mock/real, vm, mapper, validations, page, scene, route and mock-server endpoint). Use when the user asks to create a new page, screen or route.
---

# New page

Create a new page that follows exactly the same structure as the existing pages.
Use `src/pages/login/` (form + API call) and `src/pages/time-tracker/` (data loading + saving) as reference implementations. Read them before writing anything.

## 1. Clarify first
Before creating files, confirm with the user:
- Page name (kebab-case, e.g. `user-profile`) and route path
- Public or protected route
- Whether it needs an API (which endpoints, request/response shape)
- Whether it shows the header (`isLoggedIn` in `AppLayout`)

Then show a short plan (list of files to create or modify) and wait for approval.

## 2. Files to create in `src/pages/<name>/`
- `api/api-model.ts`: API interfaces
- `api/api-mock.ts`: `fetch` against `${import.meta.env.VITE_BASE_URL}/api/...`, throw `Error` when `!response.ok`
- `api/api-real.ts`: same signatures, `throw new Error('Not implemented')`, unused params prefixed with `_`
- `api/api.ts`: picks mock or real with `import.meta.env.VITE_IS_MOCK === 'true'`
- `api/index.ts`: `export * from './api';`
- `<name>.vm.ts`: view models + `empty...` defaults
- `<name>.mapper.ts`: model ⇄ vm mapping (the UI never uses API models directly)
- `<name>.validations.ts` (if there is a form)
- `<name>.business.ts` (if there is pure logic)
- `components/<part>/<part>.component.tsx` + `<part>.module.css` + `components/index.ts`
- `<name>.page.tsx` + `<name>.module.css`: `export const XxxPage: React.FC`
- `index.ts`: `export * from './<name>.page';`
- A `*.spec.ts` for every mapper, validations and business file (Vitest, `it('Should ...')`, Arrange/Act/Assert)

## 3. Wire it up
- `src/pages/index.ts`: export the new page
- `src/scenes/<name>.scene.tsx`: `AppLayout` + providers + page. Export it from `src/scenes/index.ts`
- `src/core/router/routes.ts`: add the path to `SwitchRoutes` and `switchRoutes`
- `src/core/router/router-component.tsx`: add the `<Route>`, wrapped in `ProtectedRoute` if it is private

## 4. Mock server (only if there is an API)
- `server-mock/src/routes.ts`: add the route
- `server-mock/src/api-model.ts`: add the types
- `server-mock/src/index.ts`: add the handler (validate input, return 400/409 like `create-account`)

## 5. Verify
Run and fix until all pass:
1. `npm run lint`
2. `npx vitest run`
3. `npm run build`

Finally, document the new route and endpoints in the README (Routing, Mock API and Testing tables, plus a Work log line), and summarize the created files to the user.
