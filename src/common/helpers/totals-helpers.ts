import * as vm from '@/common/model';

// Totals shared by the table and the Excel export, so both always show the same numbers.
// They return plain numbers: rounding them for display is up to whoever shows them.

// dateId is 0-based, so the days of the month go from 0 to daysInMonth - 1
const isDayOfMonth = (dateId: number, daysInMonth: number): boolean => dateId >= 0 && dateId < daysInMonth;

// Hours of one task on one day. Adds up every entry of that day, in case there is more than one
export const getTaskHoursByDay = (tracker: vm.DashboardVm, dateId: number): number => (
  Array.isArray(tracker.workedHours) ? tracker.workedHours
    .filter((workedHour) => workedHour.dateId === dateId)
    .reduce((total, workedHour) => total + workedHour.value, 0) : 0
);

// Total of one day across all tasks
export const getDayTotal = (trackerList: vm.DashboardVm[], dateId: number): number => (
  Array.isArray(trackerList) ? trackerList.reduce(
    (total, tracker) => total + getTaskHoursByDay(tracker, dateId),
    0
  ) : 0
);

// Total of one task. Only counts the days of the month, the same days the table header and the Excel show
export const getTaskTotal = (tracker: vm.DashboardVm, daysInMonth: number): number => (
  Array.isArray(tracker.workedHours) ? tracker.workedHours
    .filter((workedHour) => isDayOfMonth(workedHour.dateId, daysInMonth))
    .reduce((total, workedHour) => total + workedHour.value, 0) : 0
);

// Total of the month: the sum of the task totals, which is also the sum of the day totals
export const getMonthTotal = (trackerList: vm.DashboardVm[], daysInMonth: number): number => (
  Array.isArray(trackerList) ? trackerList.reduce(
    (total, tracker) => total + getTaskTotal(tracker, daysInMonth),
    0
  ) : 0
);
