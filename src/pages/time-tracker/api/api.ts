import * as server from '../../../data-mock';
import { getTrackerListMock } from './api-mock';
import { getTrackerListReal } from './api-real';

export const getTrackerList = async (): Promise<server.Dashboard[]> => {
  if (import.meta.env.VITE_IS_MOCK === 'true') {
    return getTrackerListMock();
  } else {
    return getTrackerListReal();
  }
}
