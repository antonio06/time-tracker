export interface Dashboard {
  task: string;
  workedHours: WorkedHours[];
}

interface WorkedHours {
  value: number;
  taskId: number;
  dateId: number;
}
