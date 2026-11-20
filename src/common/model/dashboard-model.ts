export interface DashboardModel {
  id: number;
  task: string;
  monthId: number;
  yearId: number;
  workedHours: WorkedHoursModel[];
}

export interface WorkedHoursModel {
  value: number;
  taskId: number;
  dateId: number;
}
