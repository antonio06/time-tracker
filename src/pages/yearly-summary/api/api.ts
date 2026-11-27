import * as model from './api-model';
import { getYearTaskListMock } from './api-mock';
import { getYearTaskListReal } from './api-real';

export const getYearTaskList = async (yearId: number, userId: number): Promise<model.DashboardModel[]> => {
  if (import.meta.env.VITE_IS_MOCK === 'true') {
    return getYearTaskListMock(yearId, userId);
  } else {
    return getYearTaskListReal(yearId, userId);
  }
};
