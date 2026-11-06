export interface Dashboard {
  id: number;
  task: string;
  workedHours: WorkedHours[];
}

interface WorkedHours {
  value: number;
  taskId: number;
  dateId: number;
}
