import * as server from '../../../data-mock';

export const getTrackerList = async (): Promise<server.Dashboard[]> => {
  return server.dashboardData;
}
