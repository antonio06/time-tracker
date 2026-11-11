import * as server from '../../../common';
import { getTrackerListMock, deleteTaskMock, saveTaskMock } from './api-mock';
import { getTrackerListReal, deleteTaskReal, saveTaskReal } from './api-real';

export const getTrackerList = async (): Promise<server.DashboardModel[]> => {
  if (import.meta.env.VITE_IS_MOCK === 'true') {
    return getTrackerListMock();
  } else {
    return getTrackerListReal();
  }
}

export const saveTask = async (task: server.DashboardModel): Promise<boolean> => {
  if (import.meta.env.VITE_IS_MOCK === 'true') {
    return saveTaskMock(task);
  } else {
    return saveTaskReal(task);
  }
}

export const deletedTask = async (taskId: number): Promise<boolean> => {
  if (import.meta.env.VITE_IS_MOCK === 'true') {
    return deleteTaskMock(taskId);
  } else {
    return deleteTaskReal(taskId);
  }
}
