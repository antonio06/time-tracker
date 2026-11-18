import * as server from '@/common';

export const getTrackerListReal = async (_monthId: number, _yearId: number, userId: number): Promise<server.DashboardModel[]> => {
  throw new Error('Not implemented ' + JSON.stringify([]));
}

export const saveTaskReal = async (_userId: number, task: server.DashboardModel): Promise<boolean> => {
  throw new Error('Not implemented ' + JSON.stringify(task));
}

export const saveDashboardReal = async (_userId: number, _monthId: number, yearId: number, dashboard: server.DashboardModel[]): Promise<boolean> => {
  throw new Error('Not implemented ' + JSON.stringify(dashboard));
}

export const deleteTaskReal = async (taskId: number, userId: number): Promise<boolean> => {
  throw new Error('Not implemented ' + JSON.stringify({ taskId, userId }));
}
