import * as server from '@/common';
import { getTrackerListMock, deleteTaskMock, saveTaskMock, saveDashboardMock } from './api-mock';
import { getTrackerListReal, deleteTaskReal, saveTaskReal, saveDashboardReal } from './api-real';

export const getTrackerList = async (monthId: number, yearId: number, userId: number): Promise<server.DashboardModel[]> => {
  if (import.meta.env.VITE_IS_MOCK === 'true') {
    return getTrackerListMock(monthId, yearId, userId);
  } else {
    return getTrackerListReal(monthId, yearId, userId);
  }
}

export const saveTask = async (userId: number, task: server.DashboardModel): Promise<boolean> => {
  if (import.meta.env.VITE_IS_MOCK === 'true') {
    return saveTaskMock(userId, task);
  } else {
    return saveTaskReal(userId, task);
  }
}

export const saveDashboard = async (userId: number, monthId: number, yearId: number, dashboard: server.DashboardModel[]): Promise<boolean> => {
  if (import.meta.env.VITE_IS_MOCK === 'true') {
    return saveDashboardMock(userId, monthId, yearId, dashboard);
  } else {
    return saveDashboardReal(userId, monthId, yearId, dashboard);
  }
}

export const deletedTask = async (taskId: number, userId: number): Promise<boolean> => {
  if (import.meta.env.VITE_IS_MOCK === 'true') {
    return deleteTaskMock(taskId, userId);
  } else {
    return deleteTaskReal(taskId, userId);
  }
}
