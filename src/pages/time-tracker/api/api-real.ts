import * as server from '../../../common';

export const getTrackerListReal = async (): Promise<server.DashboardModel[]> => {
  throw new Error('Not implemented ' + JSON.stringify([]));
}

export const saveTaskReal = async (task: server.DashboardModel): Promise<boolean> => {
  throw new Error('Not implemented ' + JSON.stringify(task));
}

export const saveDashboardReal = async (dashboard: server.DashboardModel[]): Promise<boolean> => {
  throw new Error('Not implemented ' + JSON.stringify(dashboard));
}

export const getTasksByMonthReal = async (monthId: string): Promise<{ monthId: string }> => {
  throw new Error('Not implemented ' + monthId);
}

export const deleteTaskReal = async (taskId: number): Promise<boolean> => {
  throw new Error('Not implemented ' + taskId);
}
