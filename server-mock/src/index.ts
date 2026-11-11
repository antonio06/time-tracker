import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { dashboardData } from './mock-data';

let dashboardDataCopy = [...dashboardData];

const app = new Hono();

app.use(logger());
app.use('/api/*', cors());

app.get('/api/dashboard', (context) => {
  return context.json(dashboardDataCopy);
});

app.post('/api/dashboard', async (context) => {
  const task = await context.req.json();
  dashboardDataCopy = [...dashboardDataCopy, task];
  return context.json(true);
});

app.put('/api/dashboard', async (context) => {
  const updatedDashboard = await context.req.json();
  dashboardDataCopy = [...updatedDashboard];
  return context.json(true);
});

app.delete('/api/dashboard/:taskId', (context) => {
  const id = Number(context.req.param('taskId'));
  const index = dashboardDataCopy.findIndex(task => task.id === id);
  if (index !== -1) {
    dashboardDataCopy = dashboardDataCopy.filter(task => task.id !== id);
    return context.json(true);
  }
  return context.json(false);
});

serve({ fetch: app.fetch, port: 3001 }, (info) => {
  console.log(`API running on ${info.port}`);
});
