import * as server from '../../../common';

export const getTrackerListReal = async (monthId: number, yearId: number): Promise<server.DashboardModel[]> => {
  throw new Error('Not implemented ' + JSON.stringify([]));
}

export const saveTaskReal = async (task: server.DashboardModel): Promise<boolean> => {
  throw new Error('Not implemented ' + JSON.stringify(task));
}

export const saveDashboardReal = async (monthId: number, yearId: number, dashboard: server.DashboardModel[]): Promise<boolean> => {
  throw new Error('Not implemented ' + JSON.stringify(dashboard));
}

export const deleteTaskReal = async (monthId: number, yearId: number, taskId: number): Promise<boolean> => {
  throw new Error('Not implemented ' + JSON.stringify({ monthId, yearId, taskId }));
}
