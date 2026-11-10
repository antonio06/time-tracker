import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { serveStatic } from '@hono/node-server/serve-static';
import { serve } from '@hono/node-server';
import { dashboardData } from './mock-data';

let dashboardDataCopy = [...dashboardData];

const app = new Hono();
app.use('/*', serveStatic({ root: './public' }));

app.use(logger());
app.use('/api/*', cors());

app.get('/api/dashboard', (c) => {
  return c.json(dashboardDataCopy);
});

app.delete('/api/dashboard/:taskId', (c) => {
  const id = Number(c.req.param('taskId'));
  const index = dashboardDataCopy.findIndex(task => task.id === id);
  if (index !== -1) {
    dashboardDataCopy = dashboardDataCopy.filter(task => task.id !== id);
    return c.json(true);
  }
  return c.json(false);
});

serve({ fetch: app.fetch, port: 3001 }, (info) => {
  console.log(`API running on ${info.port}`);
});
