import * as server from '../../../common';

export const getTrackerListReal = async (): Promise<server.DashboardModel[]> => {
  return [];
}

export const saveTaskReal = async (task: server.DashboardModel): Promise<boolean> => {
  throw new Error('Not implemented ' + JSON.stringify(task));
}

export const deleteTaskReal = async (taskId: number): Promise<boolean> => {
  throw new Error('Not implemented ' + taskId);
}
