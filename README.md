# Time Tracker — Monthly Timesheet

A modern web application to track working hours per task across a monthly calendar, with Excel export support and a fully tested architecture.

![Time Tracker screenshot](./docs/image.png)

## Features

### Core Functionality
- 📅 **Monthly calendar view** with all days of the month as columns
- 🗓️ **Month selector** - Navigate between different months with context management
- ✅ **Add and delete tasks** dynamically
- ✏️ **Edit task names and hours** directly in the table
- ➕ **Per-day totals and grand total row** calculated in real-time
- 💾 **Save dashboard changes** - Persist modifications to the backend
- 📊 **Export to Excel** - Generate formatted `.xlsx` files with the timesheet

### User Experience
- 🎨 **Clean, modern UI** with the [Lato](https://fonts.google.com/specimen/Lato) typeface
- ⚠️ **Alert notifications** for user feedback (success/error messages)
- 🔄 **Real-time updates** when editing tasks and hours
- 🌐 **Responsive design** optimized for different screen sizes

### Technical Features
- ✅ **Comprehensive test coverage** with unit tests for business logic
- 🏗️ **Clean architecture** with separation of concerns (components, business logic, mappers, helpers)
- 🔌 **Flexible API integration** - Supports both mock and real API backends
- 🧪 **Type-safe** with full TypeScript support
- 🌍 **Global state management** with React Context API for month/year navigation

## Tech stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 19 | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | 6 | Type safety |
| [Vite](https://vite.dev/) | 8 | Build tool & dev server |
| [ExcelJS](https://github.com/exceljs/exceljs) | 4 | Excel file generation |
| [Vitest](https://vitest.dev/) | 5 | Unit testing |
| [ESLint](https://eslint.org/) | 10 | Code quality |

## Project Architecture

### Directory Structure

```
src/
├── common/
│   ├── components/          # Reusable UI components
│   │   ├── alert/          # Alert notification system
│   │   └── table/          # Time table display
│   ├── helpers/            # Utility functions for time & data manipulation
│   └── model/              # Data models & view models
├── pages/
│   └── time-tracker/       # Main page & features
│       ├── api/            # API integration (mock & real)
│       ├── components/     # Page-specific components
│       ├── business/       # Business logic & calculations
│       └── mapper/         # Data transformation layer
├── App.tsx                 # Main app component
└── main.tsx               # React entry point
```

### Key Components

#### **TimeTrackerPage** (`src/pages/time-tracker/time-tracker.page.tsx`)
The main page component that orchestrates:
- Month navigation and selection
- Task list management (add/delete/edit)
- Hours input and validation
- Dashboard persistence
- Excel export functionality

#### **TimeTable** (`src/common/components/table/time-table.tsx`)
Renders the interactive timesheet table with:
- Calendar columns for each day of the month
- Task rows with editable hours
- Daily totals column
- Grand total row

#### **MonthSelector** (`src/pages/time-tracker/components/month-selector/`)
Allows users to navigate between different months

#### **ActionsComponent** (`src/pages/time-tracker/components/actions/`)
Provides action buttons for:
- Adding new tasks
- Saving changes
- Exporting to Excel
- Deleting tasks

#### **Alert System** (`src/common/components/alert/`)
Displays user feedback with customizable success/error messages and auto-hide functionality

### Business Logic Layer

#### **time-tracker.business.ts**
Core calculations for:
- Extracting days from month dates
- Computing daily totals
- Calculating grand total hours
- Working hours aggregation by day

#### **time-tracker.mapper.ts**
Transforms data between:
- API response format → View Model (VM)
- View Model → Backend model for saving

#### **Common Helpers**
- **time-helpers.ts**: Date manipulation and formatting
- **common-helpers.ts**: General utility functions

## Getting started

### Prerequisites

- Node.js 18+

### Installation

```bash
npm install
```

### Running locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server at `http://localhost:5173` |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint for code quality checks |
| `npm run test` | Run all unit tests with Vitest |
| `npm run start:api-server` | Start the mock API server from `server-mock` directory |

## Testing

The project includes comprehensive unit tests for critical business logic:

### Test Coverage

- **time-tracker.business.spec.ts** - Tests for calculations (totals, aggregations)
- **time-tracker.mapper.spec.ts** - Tests for data transformations
- **table-business.spec.ts** - Tests for table-related logic
- **time-helpers.spec.ts** - Tests for date/time utilities
- **common-helpers.spec.ts** - Tests for common utility functions

### Running Tests

```bash
npm run test
```

To run tests in watch mode:

```bash
npm run test -- --watch
```

## State Management with Context

The application uses **React Context API** to manage global state for month and year navigation:

### TimeContext (`src/common/context/time-context.tsx`)

```typescript
interface TimeContextProps {
  month: number;        // Range: 1-12 (not 0-11)
  year: number;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
}
```

### Using the Context

```typescript
import { useTimeContext } from '../../common/context';

const MyComponent = () => {
  const { month, year, setMonth, setYear } = useTimeContext();
  
  // month ranges from 1-12 (1 = January, 12 = December)
  return <div>{month}/{year}</div>;
};
```

**Important:** Month values range from **1-12**, not 0-11. This is different from JavaScript's `Date.getMonth()` which returns 0-11.

## Data Models

### DashboardModel & DashboardVm

```typescript
interface DashboardModel {
  id: number | string;           // Unique task identifier
  task: string;                  // Task name/description
  monthId: number;               // Month (1-12)
  yearId: number;                // Year
  workedHours: WorkedHoursModel[];
}

interface DashboardVm {
  id: number | string;
  task: string;
  monthId: number;
  yearId: number;
  workedHours: WorkedHoursVm[];
}
```

### WorkedHoursModel & WorkedHoursVm

```typescript
interface WorkedHoursModel {
  value: number;        // Hours worked (e.g., 8.5)
  taskId: number | string; // Reference to task
  dateId: number;       // Day of month (0-based index, 0 = 1st day)
}

interface WorkedHoursVm {
  value: number;
  taskId: number | string;
  dateId: number;
}
```

### Example Task Structure

```json
{
  "id": 1699858123456,
  "task": "Development",
  "monthId": 11,
  "yearId": 2026,
  "workedHours": [
    { "value": 8, "taskId": 1699858123456, "dateId": 0 },
    { "value": 8.5, "taskId": 1699858123456, "dateId": 1 },
    { "value": 0, "taskId": 1699858123456, "dateId": 2 }
  ]
}
```

## API Endpoints

### GET /api/dashboard

Retrieve all tasks for a specific month and year.

**Query Parameters:**
- `monthId` (required): Month number (1-12)
- `yearId` (required): Year number

**Request:**
```bash
GET /api/dashboard?monthId=11&yearId=2026
```

**Response:**
```json
[
  {
    "id": 1699858123456,
    "task": "Development",
    "monthId": 11,
    "yearId": 2026,
    "workedHours": [
      { "value": 8, "taskId": 1699858123456, "dateId": 0 },
      { "value": 8.5, "taskId": 1699858123456, "dateId": 1 }
    ]
  }
]
```

### POST /api/dashboard

Save or update dashboard tasks and hours.

**Query Parameters:**
- `monthId` (required): Month number (1-12)
- `yearId` (required): Year number

**Request Body:**
```json
[
  {
    "id": 1699858123456,
    "task": "Development",
    "monthId": 11,
    "yearId": 2026,
    "workedHours": [
      { "value": 8, "taskId": 1699858123456, "dateId": 0 }
    ]
  }
]
```

**Response:**
```json
{
  "success": true,
  "message": "Dashboard saved successfully"
}
```

### DELETE /api/dashboard/:taskId

Delete a specific task.

**Query Parameters:**
- `monthId` (required): Month number (1-12)
- `yearId` (required): Year number

**Request:**
```bash
DELETE /api/dashboard/1699858123456?monthId=11&yearId=2026
```

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

## Known Gotchas & Important Notes

### ⚠️ Month Range (1-12, not 0-11)

The application uses **1-based month indexing** (1 = January, 12 = December) throughout, different from JavaScript's `Date.getMonth()` which returns 0-11.

- **TimeContext:** `month` ranges from 1-12
- **getDaysInMonth():** Expects (month, year) with month as 1-12
- **getMonthName():** Expects month as 1-12
- **API:** All `monthId` parameters should be 1-12

**Example:**
```typescript
// ✅ Correct
getDaysInMonth(11, 2026)  // November 2026
getMonthName(1)           // "January"

// ❌ Wrong
getDaysInMonth(0, 2026)   // Invalid!
getMonthName(0)           // ""
```

### 📅 Date Indexing in workedHours

The `dateId` field in `WorkedHoursModel` is **0-based**:
- `dateId: 0` = 1st day of the month
- `dateId: 1` = 2nd day of the month
- `dateId: 29` = 30th day of the month (if the month has 30+ days)

### 🔄 Creating Empty Tracks

When adding a new task, use `createEmptyTrack()` to ensure the correct number of days:

```typescript
import { createEmptyTrack } from './time-tracker.mapper';
import { getDaysInMonth } from '../../common/helpers';

const month = 11;  // November
const year = 2026;
const daysCount = getDaysInMonth(month, year).length;

const newTask = createEmptyTrack(daysCount, month, year);
// Results in 30 workedHours entries (November has 30 days)
```

## Environment Variables

| Variable | Values | Description |
|---|---|---|
| `VITE_IS_MOCK` | `true` / `false` | Use mock data instead of the real API |

## Mock API Server

The project includes a mock API server for development and testing purposes.

### Running the mock server

```bash
npm run start:api-server
```

The server will run on `http://localhost:3001`.

Alternatively, you can run it manually:

```bash
cd server-mock
npm install
npm run server
```

### Features

- ✅ CORS support enabled for cross-origin requests
- ✅ Static file serving from the `public` directory
- ✅ Persistent mock data for development
- ✅ Predictable responses for testing UI flows

### Environment Setup

To use the mock API, set the environment variable:

```bash
VITE_IS_MOCK=true
```

Or create a `.env` file:

```
VITE_IS_MOCK=true
```

## Development Workflow

1. **Start the mock server** (optional, for API testing):
   ```bash
   npm run start:api-server
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **View the app** at `http://localhost:5173`

4. **Make changes** - The dev server will hot-reload your changes

5. **Run tests** as needed:
   ```bash
   npm run test
   ```

6. **Build for production**:
   ```bash
   npm run build
   ```
