import * as server from './api-model';

export const getTrackerListReal = async (_monthId: number, _yearId: number, _userId: number): Promise<server.DashboardModel[]> => {
  throw new Error('Not implemented ' + JSON.stringify([]));
}

export const saveDashboardReal = async (_userId: number, _monthId: number, _yearId: number, dashboard: server.DashboardModel[]): Promise<boolean> => {
  throw new Error('Not implemented ' + JSON.stringify(dashboard));
}
