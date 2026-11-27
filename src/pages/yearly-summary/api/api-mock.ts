import * as model from './api-model';

const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/summary`;

export const getYearTaskListMock = async (yearId: number, userId: number): Promise<model.DashboardModel[]> => {
  const response = await fetch(`${baseUrl}?yearId=${yearId}&userId=${userId}`);

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? `Status ${response.status}`);
  }
  return response.json();
};
