import * as server from '../../../data-mock';

const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/dashboard`;

export const getTrackerListMock = async (): Promise<server.Dashboard[]> => {
  return fetch(baseUrl).then(res => res.json());
}

export const deleteTaskMock = async (taskId: number): Promise<boolean> => {
  return fetch(`${baseUrl}/${taskId}`, {
    method: 'DELETE'
  }).then(res => res.json());
}
