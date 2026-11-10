import * as server from '../../../data-mock';

export const getTrackerListReal = async (): Promise<server.Dashboard[]> => {
  return [];
}

export const deleteTaskReal = async (taskId: number): Promise<boolean> => {
  throw new Error('Not implemented ' + taskId);
}
