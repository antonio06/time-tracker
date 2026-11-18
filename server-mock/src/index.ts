import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { workerData } from './mock-data';
import * as model from './api-model';
import { routes } from './routes';
import { mapWorkerToUser } from './mappers';

let workerDataCopy = { ...workerData };
let workerDataListCopy: model.Worker[] = [workerDataCopy];

const app = new Hono();

app.use(logger());
app.use('/api/*', cors());

const filterWorkerDashboard = (monthId: number, yearId: number) => {
  return workerDataCopy.dashboard.filter(task => task.monthId === monthId && task.yearId === yearId);
};

app.delete(`${routes.baseUrl}/:taskId`, (context) => {
  const taskId = Number(context.req.param('taskId'));
  console.log(taskId);
  const userId = Number(context.req.query('userId'));
  const filteredWorker = workerDataListCopy.find(user => user.id === userId);

  if (!filteredWorker) {
    return context.json(false);
  }
  const index = filteredWorker.dashboard.findIndex(task => task.id === taskId);
  console.log(index)
  if (index !== -1) {
    workerDataListCopy = workerDataListCopy.map(u => u.id === userId ? { ...u, dashboard: filteredWorker.dashboard.filter(task => task.id !== taskId) } : u);
    return context.json(true);
  }
  return context.json(false);
});

app.post(routes.login, async (context) => {
  const credentials = await context.req.json<model.UserCredentials>();

  const filteredUser = workerDataListCopy.find(user => user.name === credentials.name && user.password === credentials.password);
  if (filteredUser) {
    const user = mapWorkerToUser(filteredUser);
    return context.json(user);
  }
  return context.json(null);
})

app.get(routes.baseUrl, (context) => {
  const monthId = Number(context.req.query('monthId'));
  const yearId = Number(context.req.query('yearId'));
  const userId = Number(context.req.query('userId'));

  const filteredData = workerDataListCopy.filter(user => user.id === userId).flatMap(user => user.dashboard.filter(task => task.monthId === monthId && task.yearId === yearId));
  return context.json(filteredData);
});

app.post(routes.baseUrl, async (context) => {
  const task = await context.req.json<model.Dashboard>();
  const userId = Number(context.req.query('userId'));

  const user = workerDataListCopy.find(user => user.id === userId);
  if (!user) {
    return context.json(false);
  }
  user.dashboard = [...user.dashboard, task];
  workerDataListCopy = workerDataListCopy.map(u => u.id === userId ? user : u);
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

app.post(routes.createAccount, async (context) => {
  const user = await context.req.json<model.UserCredentials>();
  const newWorker = model.createEmptyWorker(user.name, user.password);
  workerDataListCopy = [...workerDataListCopy, newWorker];
  return context.json(true);
});

serve({ fetch: app.fetch, port: 3001 }, (info) => {
  console.log(`API running on ${info.port}`);
});
