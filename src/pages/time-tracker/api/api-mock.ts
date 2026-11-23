import * as server from './api-model';

const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/dashboard`;

export const getTrackerListMock = async (monthId: number, yearId: number, userId: number): Promise<server.DashboardModel[]> => {
  return fetch(`${baseUrl}?monthId=${monthId}&yearId=${yearId}&userId=${userId}`).then(res => res.json());
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
