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