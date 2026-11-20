# Time Tracker — Monthly Timesheet

A web application to track working hours per task across a monthly calendar, with Excel export and unit-tested business logic.

![Time Tracker screenshot](./docs/image.png)

## Features

- 🔐 **Login and account creation** with protected routes
- 📅 **Monthly calendar view** with one column per day of the month
- 🗓️ **Month selector** to navigate between months
- ✅ **Add, rename and delete tasks** directly in the table
- ⏱️ **Edit worked hours per day** (weekends are disabled)
- ➕ **Per-task, per-day and grand totals**, recalculated as you type
- 💾 **Save changes** to the backend. All edits (adding, renaming and deleting tasks, and changing hours) stay local until you press **Save**
- ⚠️ **Unsaved changes protection**: you get a warning when you change month, log out or close the tab with unsaved changes
- 📊 **Export to Excel**: generates a formatted `.xlsx` file of the current month
- 🔔 **Alert notifications** for success and error feedback
- 🔌 **Mock / real API switch** via environment variable

## Tech stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 19 | UI framework |
| [React Router](https://reactrouter.com/) | 7 | Routing |
| [TypeScript](https://www.typescriptlang.org/) | 6 | Type safety |
| [Vite](https://vite.dev/) | 8 | Build tool and dev server |
| [ExcelJS](https://github.com/exceljs/exceljs) | 4 | Excel file generation |
| [Vitest](https://vitest.dev/) | 5 | Unit testing |
| [ESLint](https://eslint.org/) | 10 | Linting |
| [Hono](https://hono.dev/) | 4 | Mock API server |

## Getting started

### Prerequisites

- Node.js `^20.19.0` or `>=22.12.0` (required by Vite 8)

### 1. Install dependencies

The frontend and the mock server have separate dependencies:

```bash
npm install
cd server-mock && npm install && cd ..
```

### 2. Configure environment variables

Copy `.env-example` to `.env` and set the mock server URL:

```bash
VITE_IS_MOCK=true
VITE_BASE_URL=http://localhost:3001
```

| Variable | Values | Description |
|---|---|---|
| `VITE_IS_MOCK` | `true` / `false` | `true` uses the mock server. `false` uses the real API (not implemented yet) |
| `VITE_BASE_URL` | URL | Base URL of the API, e.g. `http://localhost:3001` |

> When `VITE_IS_MOCK=true`, the default month is **November 2026** to match the mock data. Otherwise, the current month is used.

### 3. Run the app

In two terminals:

```bash
# Terminal 1: mock API at http://localhost:3001
npm run start:api-server

# Terminal 2: frontend at http://localhost:5173
npm run dev
```

**Mock credentials:** username `user1`, password `test`. You can also create a new account from the login page.

## Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server at `http://localhost:5173` |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests with Vitest (watch mode) |
| `npx vitest run` | Run unit tests once (e.g. for CI) |
| `npm run start:api-server` | Start the mock API server (`server-mock/`) |

## Project structure

```
├── server-mock/                  # Mock API (Hono, in-memory data)
│   └── src/
│       ├── index.ts              # Endpoints
│       ├── mock-data.ts          # Initial data (user1)
│       ├── api-model.ts
│       ├── mappers.ts
│       └── routes.ts
└── src/
    ├── common/
    │   ├── components/           # Shared UI: alert, header, footer, table
    │   ├── context/              # React contexts (see below)
    │   ├── helpers/              # Date and general utilities
    │   └── model/                # Dashboard models shared across pages
    ├── core/
    │   └── router/               # Routes, router and ProtectedRoute
    ├── layouts/                  # AppLayout (header + content + footer)
    ├── pages/                    # One folder per page
    │   ├── login/
    │   ├── create-account/
    │   ├── time-tracker/
    │   └── notFound/
    ├── scenes/                   # Page + layout + providers for each route
    ├── App.tsx
    └── main.tsx
```

### Page anatomy

Every page follows the same layered structure:

```
pages/time-tracker/
├── api/
│   ├── api.ts                    # Public API: picks mock or real based on VITE_IS_MOCK
│   ├── api-mock.ts               # Calls the mock server
│   ├── api-real.ts               # Real API (not implemented yet)
│   └── api-model.ts              # Shapes returned by the API
├── components/                   # Page-specific components
├── *.page.tsx                    # Page component (state and orchestration)
├── *.vm.ts                       # View models used by the UI
├── *.mapper.ts                   # API model ⇄ view model conversion
├── *.business.ts                 # Pure logic (calculations)
├── *.validations.ts              # Form validations
└── *.spec.ts                     # Unit tests
```

The UI never consumes API models directly. Data always goes through a mapper, so a change in the API only affects the mapper.

## Routing

| Path | Scene | Access |
|---|---|---|
| `/` | `LoginScene` | Public |
| `/create-account` | `CreateAccountScene` | Public |
| `/time-tracker` | `TimeTrackerScene` | Protected |
| `*` | `NotFoundScene` | Public |

Protected routes are wrapped in `ProtectedRoute` (`src/core/router/protected-router.component.tsx`), which redirects to `/` when there is no logged-in user:

```tsx
<Route
  path={switchRoutes.timeTracker}
  element={<ProtectedRoute><TimeTrackerScene /></ProtectedRoute>}
/>
```

The header (user name and logout) is only shown on the time tracker scene.

> The user is kept in memory only, so **reloading the page logs you out**.

## State management

Global state uses the React Context API. Each context is split into two files: `*-context.ts` holds the context and its hook, and `*-provider.tsx` holds the provider component. This keeps Vite's Fast Refresh working.

| Context | Hook | Provided in | Holds |
|---|---|---|---|
| `UserContext` | `useUserContext()` | `RouterComponent` (whole app) | Logged-in user `{ id, name }` |
| `TimeContext` | `useTimeContext()` | `TimeTrackerScene` | Selected `month` (1–12) and `year` |
| `UnsavedChangesContext` | `useUnsavedChangesContext()` | `TimeTrackerScene` | `isDirty` flag for unsaved changes |

```tsx
import { useTimeContext, useUserContext } from '@/common/context';

const { month, year, setMonth } = useTimeContext();
const { user, setUser } = useUserContext();
```

Each hook returns safe defaults when used outside its provider. For example, `isDirty` is `false`.

`UnsavedChangesContext` sits above `AppLayout` so that both the page and the header can read it:

```
UnsavedChangesProvider
└── AppLayout
    ├── Header              ← asks for confirmation on logout if isDirty
    └── TimeProvider
        └── TimeTrackerPage ← sets isDirty on any edit, resets it after a successful save
```

### Saving model

The time tracker page works like a document: every change is applied to local state only, and pressing **Save** sends the whole month to the server in a single `PUT`. The server replaces all tasks of that month, which also creates new tasks and removes deleted ones. The page then reloads the month from the server.

## Data model

```typescript
interface DashboardModel {
  id: number;                     // Task id
  task: string;                   // Task name
  monthId: number;                // 1–12
  yearId: number;
  workedHours: WorkedHoursModel[];
}

interface WorkedHoursModel {
  value: number;                  // Hours worked (e.g. 7.5)
  taskId: number;                 // Id of the task it belongs to
  dateId: number;                 // 0-based day index (0 = 1st of the month)
}
```

## Mock API

The mock server (`server-mock/`) runs on `http://localhost:3001` with CORS enabled. Data is kept **in memory**: changes are lost when the server restarts.

| Method | Endpoint | Body | Response |
|---|---|---|---|
| `POST` | `/api/login` | `{ name, password }` | `{ id, name }`, or `null` if credentials are wrong |
| `POST` | `/api/create-account` | `{ name, password }` | `{ id, name }`. `400` if fields are missing, `409` if the user already exists |
| `GET` | `/api/dashboard?userId=&monthId=&yearId=` | — | `DashboardModel[]` for that user and month |
| `PUT` | `/api/dashboard?userId=&monthId=&yearId=` | `DashboardModel[]` | `true` / `false`. Replaces all tasks of that month (creates, updates and deletes) |

Example `GET /api/dashboard?userId=1&monthId=11&yearId=2026`:

```json
[
  {
    "id": 1,
    "task": "Task 1",
    "monthId": 11,
    "yearId": 2026,
    "workedHours": [
      { "value": 0, "taskId": 1, "dateId": 0 },
      { "value": 0.5, "taskId": 1, "dateId": 1 }
    ]
  }
]
```

> ⚠️ The mock has no real authentication: any `userId` can be queried. A real backend needs tokens, hashed passwords and input validation.

## Testing

Unit tests cover the pure logic of the app:

| Spec | Covers |
|---|---|
| `time-tracker.business.spec.ts` | Totals and day calculations for the Excel export |
| `time-tracker.mapper.spec.ts` | API model ⇄ view model mapping |
| `table-business.spec.ts` | Table totals and rounding |
| `time-helpers.spec.ts` | Date utilities |
| `common-helpers.spec.ts` | Month names |
| `login.validations.spec.ts` | Login form validation |
| `create-account.validations.spec.ts` | Create account form validation |

```bash
npm run test        # watch mode
npx vitest run      # single run
```

## Path aliases

`@/` points to `src/`, configured in `tsconfig.app.json` (`baseUrl` + `paths`) and resolved by `vite-tsconfig-paths`:

```typescript
// ❌ Relative path
import { Header } from '../../../common/components/header';

// ✅ Alias
import { Header } from '@/common/components/header';
```

## Gotchas

- **Months are 1-based** (1 = January) everywhere in the app and the API, unlike JavaScript's `Date.getMonth()`, which returns 0–11.
- **`dateId` is 0-based**: `dateId: 0` is the 1st of the month.
- **New tasks** must have one `workedHours` entry per day. Use `createEmptyTrack(getDaysInMonth(month, year).length, month, year)`.
- **Task ids for new tasks are generated on the client** (`Date.now() + Math.random()`). That's fine for the mock, but a real backend should assign ids when saving.

## Backlog

- [ ] Move `DashboardModel` and `WorkedHoursModel` from `src/common/model` to `src/pages/time-tracker/api/api-model.ts`, to follow the page anatomy (see [Page anatomy](#page-anatomy)). `DashboardVm` and `WorkedHoursVm` stay in `src/common/model` because the shared table uses them. This changes the folder structure, so propose it in plan mode first.
- [ ] Fix the `react-hooks/exhaustive-deps` warning in `time-tracker.page.tsx`: the `useEffect` that reloads the month calls `loadedTrackerList` without listing it as a dependency. Note: `hideAlert` from `useHideMessage` is NOT stable (recreated on every render), so adding it as a dependency would cause an infinite reload loop. Propose options in plan mode (e.g. memoize `hideAlert` with `useCallback`, or move the fetch logic inside the effect) before changing anything.

## Work log

### 2026-11-20
- Fixed swapped contents of `dashboard-model.ts` and `dashboard-vm.ts` in `src/common/model`: the API models are now in `dashboard-model.ts` and the view models in `dashboard-vm.ts`.

### 2026-11-18 / 2026-11-19
- Fixed the build (`tsconfig.json` paths, unused parameters in `api-real.ts`).
- Fixed users being logged in when account creation failed. API errors now throw and show the server message.
- Mock server: `create-account` validates fields and rejects duplicate users (`400` / `409`).
- Deleting a task no longer discards unsaved edits.
- Added unsaved changes protection (month change, logout, closing the tab) through `UnsavedChangesContext`.
- Split contexts into `*-context.ts` and `*-provider.tsx` to fix Fast Refresh lint errors.
- Adding and deleting tasks is now local until **Save**, consistent with editing hours. Removed the `POST /api/dashboard` and `DELETE /api/dashboard/:taskId` endpoints and their API functions.

### 2026-11-17
- Fixed line breaks in alert messages (`white-space: pre-wrap` in `alert.module.css`).
