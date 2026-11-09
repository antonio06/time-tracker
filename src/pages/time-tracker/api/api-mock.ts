import * as server from '../../../data-mock';

export const getTrackerListMock = async (): Promise<server.Dashboard[]> => {
  return server.dashboardData;
}
