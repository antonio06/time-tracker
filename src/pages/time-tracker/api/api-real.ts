import * as server from '@/common';

export const getTrackerListReal = async (monthId: number, yearId: number, userId: number): Promise<server.DashboardModel[]> => {
  throw new Error('Not implemented ' + JSON.stringify([]));
}

export const saveTaskReal = async (userId: number, task: server.DashboardModel): Promise<boolean> => {
  throw new Error('Not implemented ' + JSON.stringify(task));
}

export const saveDashboardReal = async (userId: number, monthId: number, yearId: number, dashboard: server.DashboardModel[]): Promise<boolean> => {
  throw new Error('Not implemented ' + JSON.stringify(dashboard));
}

export const deleteTaskReal = async (taskId: number, userId: number): Promise<boolean> => {
  throw new Error('Not implemented ' + JSON.stringify({ taskId, userId }));
}
