import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { workerData } from './mock-data';
let workerDataCopy = { ...workerData };

const app = new Hono();

app.use(logger());
app.use('/api/*', cors());

const filterWorkerDashboard = (monthId: number, yearId: number) => {
  return workerDataCopy.dashboard.filter(task => task.monthId === monthId && task.yearId === yearId);
};

app.delete('/api/dashboard/:taskId', (context) => {
  const id = Number(context.req.param('taskId'));
  const monthId = Number(context.req.query('monthId'));
  const yearId = Number(context.req.query('yearId'));

  const index = workerDataCopy.dashboard.findIndex(task => task.id === id);
  if (index !== -1) {
    const filteredData = filterWorkerDashboard(monthId, yearId);
    workerDataCopy.dashboard = workerDataCopy.dashboard.filter(task => task.id !== id);
    return context.json(true);
  }
  return context.json(false);
});

app.get('/api/dashboard', (context) => {
  const monthId = Number(context.req.query('monthId'));
  const yearId = Number(context.req.query('yearId'));

  const filteredData = filterWorkerDashboard(monthId, yearId);
  return context.json(filteredData);
});

app.post('/api/dashboard', async (context) => {
  const task = await context.req.json();

  workerDataCopy.dashboard = [...workerDataCopy.dashboard, task];
  return context.json(true);
});

app.put('/api/dashboard', async (context) => {
  const updatedDashboard = await context.req.json();
  const monthId = Number(context.req.query('monthId'));
  const yearId = Number(context.req.query('yearId'));

  workerDataCopy.dashboard = workerDataCopy.dashboard.filter(task => task.monthId !== monthId || task.yearId !== yearId);

  workerDataCopy.dashboard = [...workerDataCopy.dashboard, ...updatedDashboard];
  return context.json(true);
});

serve({ fetch: app.fetch, port: 3001 }, (info) => {
  console.log(`API running on ${info.port}`);
});
