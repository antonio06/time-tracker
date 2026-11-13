import * as server from '../../../common';

const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/dashboard`;

export const getTrackerListMock = async (monthId: number, yearId: number): Promise<server.DashboardModel[]> => {
  return fetch(`${baseUrl}?monthId=${monthId}&yearId=${yearId}`).then(res => res.json());
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

export const saveDashboardMock = async (monthId: number, yearId: number, dashboard: server.DashboardModel[]): Promise<boolean> => {
  return fetch(`${baseUrl}?monthId=${monthId}&yearId=${yearId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dashboard),
  }).then(res => res.json());
}

export const getTasksByMonthMock = async (monthId: string): Promise<{ monthId: string }> => {
  return fetch(`${baseUrl}/${monthId}`).then(res => res.json());
}

export const deleteTaskMock = async (monthId: number, yearId: number, taskId: number): Promise<boolean> => {
  return fetch(`${baseUrl}?monthId=${monthId}&yearId=${yearId}&taskId=${taskId}`, {
    method: 'DELETE'
  }).then(res => res.json());
}
