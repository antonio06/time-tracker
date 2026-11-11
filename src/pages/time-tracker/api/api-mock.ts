import * as server from '../../../common';

const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/dashboard`;

export const getTrackerListMock = async (): Promise<server.DashboardModel[]> => {
  return fetch(baseUrl).then(res => res.json());
}

export const saveTaskMock = async (task: server.DashboardModel): Promise<boolean> => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  }).then(res => res.json());
}

export const deleteTaskMock = async (taskId: number): Promise<boolean> => {
  return fetch(`${baseUrl}/${taskId}`, {
    method: 'DELETE'
  }).then(res => res.json());
}
