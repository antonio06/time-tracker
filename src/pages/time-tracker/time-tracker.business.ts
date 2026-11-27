import * as vm from '@/common/model';
import { getDaysInMonth, getShortDayLabel } from '@/common/helpers';

// Labels of the Excel header, e.g. ["1 Sun", "2 Mon", ...]. Empty when the month is not 1-12
export const getDaysOfMonth = (month: number, year: number): string[] => (
  month >= 1 && month <= 12 ? getDaysInMonth(month, year).map(getShortDayLabel) : []
);

// Sets the hours of one task on one day. Leaves a single entry for that day whatever the task had
// (none, one or several), so getTaskHoursByDay returns exactly the typed value. Entries of other days,
// including those outside the month, are kept as they are. The result is sorted by day.
export const updateTaskHoursByDay = (tracker: vm.DashboardVm, dateId: number, value: number): vm.DashboardVm => ({
  ...tracker,
  workedHours: [
    ...tracker.workedHours.filter((workedHour) => workedHour.dateId !== dateId),
    { value, taskId: tracker.id, dateId },
  ].sort((a, b) => a.dateId - b.dateId),
});
