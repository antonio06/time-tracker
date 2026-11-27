export interface YearlySummaryVm {
  totalWorkHoursByYear: number;
  averageWorkHours: number;
}

export const emptyYearlySummary: YearlySummaryVm = {
  totalWorkHoursByYear: 0,
  averageWorkHours: 0,
};
