import * as server from '../../../data-mock';

let mockDashboardData = server.dashboardData;

export const getTrackerListMock = async (): Promise<server.Dashboard[]> => {
  return mockDashboardData;
}

export const deleteTaskMock = async (taskId: number): Promise<boolean> => {
  mockDashboardData = mockDashboardData.filter(task => task.id !== taskId);
  return true
}
