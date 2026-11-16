import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { workerData } from './mock-data';
import * as model from './api-model';
import { routes } from './routes';

let workerDataCopy = { ...workerData };

const app = new Hono();

app.use(logger());
app.use('/api/*', cors());

const filterWorkerDashboard = (monthId: number, yearId: number) => {
  return workerDataCopy.dashboard.filter(task => task.monthId === monthId && task.yearId === yearId);
};

app.delete(`${routes.baseUrl}/:taskId`, (context) => {
  const id = Number(context.req.param('taskId'));

  const index = workerDataCopy.dashboard.findIndex(task => task.id === id);
  if (index !== -1) {
    workerDataCopy.dashboard = workerDataCopy.dashboard.filter(task => task.id !== id);
    return context.json(true);
  }
  return context.json(false);
});

app.post(routes.login, async (context) => {
  const credentials = await context.req.json<model.UserCredentials>();

  if (credentials.name === 'user1' && credentials.password === 'test') {
    return context.json(true);
  }
  return context.json(false);
})

app.get(routes.baseUrl, (context) => {
  const monthId = Number(context.req.query('monthId'));
  const yearId = Number(context.req.query('yearId'));

  const filteredData = filterWorkerDashboard(monthId, yearId);
  return context.json(filteredData);
});

app.post(routes.baseUrl, async (context) => {
  const task = await context.req.json<model.Dashboard>();

  workerDataCopy.dashboard = [...workerDataCopy.dashboard, task];
  return context.json(true);
});

app.put(routes.baseUrl, async (context) => {
  const updatedDashboard = await context.req.json<model.Dashboard[]>();
  const monthId = Number(context.req.query('monthId'));
  const yearId = Number(context.req.query('yearId'));

  workerDataCopy.dashboard = workerDataCopy.dashboard.filter(task => task.monthId !== monthId || task.yearId !== yearId);

  workerDataCopy.dashboard = [...workerDataCopy.dashboard, ...updatedDashboard];
  return context.json(true);
});

serve({ fetch: app.fetch, port: 3001 }, (info) => {
  console.log(`API running on ${info.port}`);
});
