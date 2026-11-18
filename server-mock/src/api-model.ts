export interface UserCredentials {
  name: string;
  password: string;
}

export interface Worker {
  id: number;
  name: string;
  password: string;
  dashboard: Dashboard[];
}

export interface Dashboard {
  id: number;
  task: string;
  monthId: number;
  yearId: number;
  workedHours: WorkedHours[];
}

interface WorkedHours {
  value: number;
  taskId: number;
  dateId: number;
}

export interface User {
  id: number;
  name: string;
}

export const createEmptyWorker = (userName: string, password: string): Worker => {
  const uniqueId = Math.floor(Date.now() + Math.random() * 1000);
  return {
    id: uniqueId,
    name: userName,
    password: password,
    dashboard: []
  };
};