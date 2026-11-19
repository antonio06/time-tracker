import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { workerData } from './mock-data';
import * as model from './api-model';
import { routes } from './routes';
import { mapWorkerToUser } from './mappers';

let workerDataListCopy: model.Worker[] = [{ ...workerData }];

const app = new Hono();

app.use(logger());
app.use('/api/*', cors());

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

app.put(routes.baseUrl, async (context) => {
  const updatedDashboard = await context.req.json<model.Dashboard[]>();
  const monthId = Number(context.req.query('monthId'));
  const yearId = Number(context.req.query('yearId'));
  const userId = Number(context.req.query('userId'));
  const workerDataCopy = workerDataListCopy.find(user => user.id === userId);
  if (!workerDataCopy) {
    return context.json(false);
  }

  workerDataCopy.dashboard = workerDataCopy.dashboard.filter(task => task.monthId !== monthId || task.yearId !== yearId);
  workerDataCopy.dashboard = [...workerDataCopy.dashboard, ...updatedDashboard];
  workerDataListCopy = workerDataListCopy.map(u => u.id === userId ? workerDataCopy : u);
  return context.json(true);
});

app.post(routes.createAccount, async (context) => {
  const user = await context.req.json<model.UserCredentials>();

  if (!user.name || !user.password) {
    return context.json({ error: 'Name and password are required' }, 400);
  }

  const exists = workerDataListCopy.some(w => w.name === user.name);
  if (exists) {
    return context.json({ error: 'User already exists' }, 409);
  }

  const newWorker = model.createEmptyWorker(user.name, user.password);
  workerDataListCopy = [...workerDataListCopy, newWorker];
  const userMapped = mapWorkerToUser(newWorker);
  return context.json(userMapped);
});

serve({ fetch: app.fetch, port: 3001 }, (info) => {
  console.log(`API running on ${info.port}`);
});
