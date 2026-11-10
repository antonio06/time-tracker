import * as server from '../../../data-mock';
import { getTrackerListMock, deleteTaskMock } from './api-mock';
import { getTrackerListReal, deleteTaskReal } from './api-real';

export const getTrackerList = async (): Promise<server.Dashboard[]> => {
  if (import.meta.env.VITE_IS_MOCK === 'true') {
    return getTrackerListMock();
  } else {
    return getTrackerListReal();
  }
}
export const deletedTask = async (taskId: number): Promise<boolean> => {
  if (import.meta.env.VITE_IS_MOCK === 'true') {
    return deleteTaskMock(taskId);
  } else {
    return deleteTaskReal(taskId);
  }
}
