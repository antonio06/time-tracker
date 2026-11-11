export interface DashboardModel {
  id: number;
  task: string;
  workedHours: WorkedHoursModel[];
}

export interface WorkedHoursModel {
  value: number;
  taskId: number;
  dateId: number;
}
