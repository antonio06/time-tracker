export interface DashboardVm {
  id: number;
  task: string;
  monthId: number;
  yearId: number;
  workedHours: WorkedHoursVm[];
}

export interface WorkedHoursVm {
  value: number;
  taskId: number;
  dateId: number;
}
