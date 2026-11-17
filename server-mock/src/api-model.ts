export interface UserCredentials {
  name: string;
  password: string;
}

export interface Worker {
  id: number;
  name: string;
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

export const createEmptyWorker = (userName: string): Worker => {
  const uniqueId = Date.now() + Math.random();
  return {
    id: uniqueId,
    name: userName,
    dashboard: []
  };
};