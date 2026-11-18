import * as server from '@/common';

const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/dashboard`;

export const getTrackerListMock = async (monthId: number, yearId: number, userId: number): Promise<server.DashboardModel[]> => {
  return fetch(`${baseUrl}?monthId=${monthId}&yearId=${yearId}&userId=${userId}`).then(res => res.json());
}

export const saveTaskMock = async (userId: number, task: server.DashboardModel): Promise<boolean> => {
  return fetch(`${baseUrl}?userId=${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  }).then(res => res.json());
}

export const saveDashboardMock = async (userId: number, monthId: number, yearId: number, dashboard: server.DashboardModel[]): Promise<boolean> => {
  return fetch(`${baseUrl}?userId=${userId}&monthId=${monthId}&yearId=${yearId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dashboard),
  }).then(res => res.json());
}

export const deleteTaskMock = async (taskId: number, userId: number): Promise<boolean> => {
  return fetch(`${baseUrl}/${taskId}?userId=${userId}`, {
    method: 'DELETE'
  }).then(res => res.json());
}
