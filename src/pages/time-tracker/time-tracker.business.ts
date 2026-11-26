import * as vm from '@/common/model';

// Created once and reused: toLocaleDateString with options builds a new ICU formatter on every call
const weekdayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' });

export const getDaysOfMonth = (month: number, year: number): string[] => {
  const jsMonth = month - 1;
  const currentDate = new Date(year, jsMonth + 1, 0);

  if (jsMonth >= 0 && jsMonth <= 11) {
    const totalDays = currentDate.getDate();

    return Array.from({ length: totalDays }, (_, index) => {
      const date = new Date(year, jsMonth, index + 1);

      const day = date.getDate();

      const weekday = weekdayFormatter.format(date);

      return `${day} ${weekday}`;
    });
  }

  return [];
};

export const getDailyTotals = (index: number, trackerList: vm.DashboardVm[]) => (
  Array.isArray(trackerList) ? trackerList.reduce((total, tracker) => {
    const hours = tracker.workedHours
      .filter((workedHour) => workedHour.dateId === index)
      .reduce((sum, workedHour) => sum + workedHour.value, 0);

    return total + hours;
  }, 0) : 0
);

export const getGrandTotal = (dailyTotals: number[]) => Array.isArray(dailyTotals) ? dailyTotals.reduce(
  (total, hours) => total + hours,
  0
) : 0;

export const getWorkedHoursByDay = (index: number, tracker: vm.DashboardVm) => Array.isArray(tracker.workedHours) ? tracker.workedHours
  .filter((workedHour) => workedHour.dateId === index)
  .reduce((total, workedHour) => total + workedHour.value, 0) : 0;

export const getTotalHours = (workedHoursByDay: number[]) => Array.isArray(workedHoursByDay) ? workedHoursByDay.reduce(
  (total, hours) => total + hours,
  0
) : 0;
