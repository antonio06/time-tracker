import * as vm from '@/common/model';
import { getDaysInMonth, getTaskTotal, isWeekend } from '@/common/helpers';
import type { YearlySummaryVm } from './yearly-summary.vm';

const MONTHS_OF_YEAR = Array.from({ length: 12 }, (_, index) => index + 1);

// Months are 1-based. getDaysInMonth(13, year) would return the days of January of the next year
const isMonthOfYear = (monthId: number): boolean => Number.isInteger(monthId) && monthId >= 1 && monthId <= 12;

// Monday to Friday of the whole year. Bank holidays are not taken into account
export const getWorkingDaysInYear = (year: number): number => (
  MONTHS_OF_YEAR
    .flatMap((month) => getDaysInMonth(month, year))
    .filter((day) => !isWeekend(day))
    .length
);

// Only counts the tasks of the year and, like the table, only the days of each task's month (weekends included)
export const getYearTotal = (trackerList: vm.DashboardVm[], year: number): number => (
  Array.isArray(trackerList) ? trackerList
    .filter((tracker) => tracker.yearId === year && isMonthOfYear(tracker.monthId))
    .reduce((total, tracker) => total + getTaskTotal(tracker, getDaysInMonth(tracker.monthId, year).length), 0) : 0
);

// The average is the year total divided by the working days of the whole year
export const getYearlySummary = (trackerList: vm.DashboardVm[], year: number): YearlySummaryVm => {
  const totalWorkHoursByYear = getYearTotal(trackerList, year);
  const workingDays = getWorkingDaysInYear(year);

  return {
    totalWorkHoursByYear,
    averageWorkHours: workingDays > 0 ? totalWorkHoursByYear / workingDays : 0,
  };
};
