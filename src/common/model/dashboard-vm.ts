export interface Dashboard {
  task: string;
  workedHours: WorkedHours[];
}

export interface WorkedHours {
  value: number;
  taskId: number;
  dateId: number;
}
