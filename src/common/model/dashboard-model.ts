export interface DashboardVm {
  id: number;
  task: string;
  workedHours: WorkedHoursVm[];
}

export interface WorkedHoursVm {
  value: number;
  taskId: number;
  dateId: number;
}
