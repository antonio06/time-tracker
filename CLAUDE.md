# time-tracker

Timesheet mensual: tareas por mes, horas por día, totales por semana/mes y exportación a Excel (exceljs).
React 19 + TypeScript 6 + Vite 8 + React Router 7 + CSS Modules + Vitest. Mock API con Hono en `server-mock/`.

La documentación completa (estructura, modelo de datos, endpoints, contextos) está en el README:
@README.md

## Idioma
- Respóndeme en español. El código, los nombres, los comentarios y los mensajes de commit van en inglés.

## Comandos
- `npm run dev:all`: arranca frontend y mock API a la vez (con `concurrently`). Es un proceso de larga duración: ejecútalo en segundo plano.
- `npm run dev`: frontend en http://localhost:5173
- `npm run start:api-server`: mock API en http://localhost:3001 (datos en memoria)
- `npm run test:run`: tests una sola vez. **No uses `npm run test`**, que se queda en modo watch. Úsalo en vez de `npx vitest run`: en Windows, con la letra de unidad en minúscula (`d:`), Vitest falla con «Cannot read properties of undefined (reading 'config')», y el script la normaliza a mayúscula.
- `npm run lint`: ESLint
- `npm run build`: `tsc -b` + build de Vite. Es el typecheck real del proyecto.

## Antes de dar una tarea por terminada
1. `npm run lint` sin errores
2. `npm run test:run` en verde
3. `npm run build` sin errores
Si cambias lógica de `*.business.ts`, `*.excel.ts`, `*.mapper.ts`, `*.validations.ts` o `common/helpers`, añade o actualiza su `*.spec.ts`.

## Arquitectura (respétala)
- `pages/<page>/` sigue siempre la misma anatomía: `api/` (api.ts, api-mock.ts, api-real.ts, api-model.ts), `components/`, `*.page.tsx`, `*.vm.ts`, `*.mapper.ts`, `*.business.ts`, `*.excel.ts` (solo en time-tracker: construye el Excel y lo descarga; `exceljs` se carga con `import()` dinámico, nunca con import estático), `*.validations.ts`, `*.spec.ts`, `index.ts`.
- La UI **nunca** usa modelos de API directamente: siempre pasa por un mapper (model ⇄ vm).
- `api/api.ts` elige mock o real con `import.meta.env.VITE_IS_MOCK === 'true'`. `api-real.ts` lanza "Not implemented" de momento.
- Cada ruta renderiza una **scene** (`src/scenes/*.scene.tsx`) que monta layout + providers + page. Rutas en `src/core/router/routes.ts` (`switchRoutes`). Las rutas privadas se envuelven en `ProtectedRoute` (`protected-router.component.tsx`).
- Contextos: `*-context.ts` (contexto + hook) y `*-provider.tsx` (provider) en archivos separados, por Fast Refresh.
- Si añades o cambias un endpoint, cámbialo también en `server-mock/src/` (index.ts, routes.ts, api-model.ts).
- La página time-tracker funciona como un documento: todo cambio es local y marca `setIsDirty(true)`. **Save** envía el mes entero con un único `PUT`.
- Los totales (horas de una tarea en un día, total por día, por tarea y del mes) viven en `common/helpers/totals-helpers.ts` y los usan la tabla y el Excel: no los vuelvas a calcular en otro sitio. Devuelven números; el redondeo a dos decimales se hace en la tabla (`getRoundPerTwoDigits` en `table-business.ts`). El total de un día suma todas sus entradas; el de una tarea, solo los días del mes.
- Las etiquetas de día («1 Sun», «Monday, November 2») y los fines de semana (`isWeekend`, con `getDay()`) viven en `common/helpers/time-helpers.ts`, con formateadores `Intl.DateTimeFormat` creados una sola vez. No uses `toLocaleDateString` con opciones: crea un formateador ICU nuevo en cada llamada.

## Convenciones de código
- Componentes: `React.FC<Props>` con `interface Props`, export nombrado (sin default, salvo `App`).
- Archivos en kebab-case: `xxx.component.tsx`, `xxx.page.tsx`, `xxx.scene.tsx`, `xxx.module.css`; cada carpeta tiene un `index.ts` barrel.
- Imports con el alias `@/` (apunta a `src/`), no rutas relativas largas.
- Estilos: CSS Modules importados como `classes`. Nada de estilos inline ni librerías de CSS nuevas.
- Hooks con el prefijo `React.` (`React.useState`, `React.useEffect`).
- Tests: Vitest con `describe`/`it('Should ...')` y comentarios `// Arrange // Act // Assert`.
- Parámetros sin usar con prefijo `_` (regla de ESLint).

## Gotchas
- Los meses son **1-based** (1 = enero) en toda la app y en la API. `Date.getMonth()` es 0-based.
- `dateId` es **0-based** (0 = día 1 del mes).
- Las tareas nuevas necesitan una entrada de `workedHours` por día: `createEmptyTrack(getDaysInMonth(month, year).length, month, year)`.
- El usuario solo vive en memoria: recargar la página cierra la sesión.
- Con `VITE_IS_MOCK=true` el mes por defecto es noviembre de 2026 (para cuadrar con los datos mock).

## Reglas
- No instales dependencias nuevas sin preguntarme antes.
- No hagas commits ni push salvo que te lo pida.
- No cambies la arquitectura de carpetas sin proponérmelo primero en plan mode.
- Al terminar una tarea relevante, añade una línea al "Work log" del README.
- No arranques servidores en segundo plano (`npm run dev`, `vite`, `preview`...) ni pares procesos. Para comprobar algo en el navegador, dime qué probar y lo hago yo.