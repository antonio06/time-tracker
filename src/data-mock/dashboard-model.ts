export interface Dashboard {
  id: number;
  task: string;
  workedHours: WorkedHours[];
}

export interface WorkedHours {
  value: number;
  taskId: number;
  dateId: number;
}
