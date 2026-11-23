import * as server from './api-model';
import { getTrackerListMock, saveDashboardMock } from './api-mock';
import { getTrackerListReal, saveDashboardReal } from './api-real';

export const getTrackerList = async (monthId: number, yearId: number, userId: number): Promise<server.DashboardModel[]> => {
  if (import.meta.env.VITE_IS_MOCK === 'true') {
    return getTrackerListMock(monthId, yearId, userId);
  } else {
    return getTrackerListReal(monthId, yearId, userId);
  }
}

export const saveDashboard = async (userId: number, monthId: number, yearId: number, dashboard: server.DashboardModel[]): Promise<boolean> => {
  if (import.meta.env.VITE_IS_MOCK === 'true') {
    return saveDashboardMock(userId, monthId, yearId, dashboard);
  } else {
    return saveDashboardReal(userId, monthId, yearId, dashboard);
  }
}
