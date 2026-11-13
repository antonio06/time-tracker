import * as server from '../../../common';
import { getTrackerListMock, deleteTaskMock, saveTaskMock, saveDashboardMock } from './api-mock';
import { getTrackerListReal, deleteTaskReal, saveTaskReal, saveDashboardReal } from './api-real';

export const getTrackerList = async (monthId: number, yearId: number): Promise<server.DashboardModel[]> => {
  if (import.meta.env.VITE_IS_MOCK === 'true') {
    return getTrackerListMock(monthId, yearId);
  } else {
    return getTrackerListReal(monthId, yearId);
  }
}

export const saveTask = async (task: server.DashboardModel): Promise<boolean> => {
  if (import.meta.env.VITE_IS_MOCK === 'true') {
    return saveTaskMock(task);
  } else {
    return saveTaskReal(task);
  }
}

export const saveDashboard = async (monthId: number, yearId: number, dashboard: server.DashboardModel[]): Promise<boolean> => {
  if (import.meta.env.VITE_IS_MOCK === 'true') {
    return saveDashboardMock(monthId, yearId, dashboard);
  } else {
    return saveDashboardReal(monthId, yearId, dashboard);
  }
}

export const deletedTask = async (monthId: number, yearId: number, taskId: number): Promise<boolean> => {
  if (import.meta.env.VITE_IS_MOCK === 'true') {
    return deleteTaskMock(monthId, yearId, taskId);
  } else {
    return deleteTaskReal(monthId, yearId, taskId);
  }
}
