import * as server from '../../../common';
import { getTrackerListMock, deleteTaskMock, saveTaskMock, saveDashboardMock, getTasksByMonthMock } from './api-mock';
import { getTrackerListReal, deleteTaskReal, saveTaskReal, saveDashboardReal, getTasksByMonthReal } from './api-real';

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

export const saveDashboard = async (dashboard: server.DashboardModel[]): Promise<boolean> => {
  if (import.meta.env.VITE_IS_MOCK === 'true') {
    return saveDashboardMock(dashboard);
  } else {
    return saveDashboardReal(dashboard);
  }
}

export const getTasksByMonth = async (monthId: string): Promise<{ monthId: string }> => {
  if (import.meta.env.VITE_IS_MOCK === 'true') {
    return getTasksByMonthMock(monthId);
  } else {
    return getTasksByMonthReal(monthId);
  }
}

export const deletedTask = async (taskId: number): Promise<boolean> => {
  if (import.meta.env.VITE_IS_MOCK === 'true') {
    return deleteTaskMock(taskId);
  } else {
    return deleteTaskReal(taskId);
  }
}
