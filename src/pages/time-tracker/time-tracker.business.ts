import * as vm from '../../common/model';

export const getDaysOfMonth = (year: number, month: number): string[] => {
  const totalDays = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: totalDays }, (_, index) => {
    const date = new Date(year, month, index + 1);

    const day = date.getDate();

    const weekday = date.toLocaleDateString('en-US', {
      weekday: 'short',
    });

    return `${day} ${weekday}`;
  });
};

export const getDailyTotals = (index: number, trackerList: vm.Dashboard[]) => {
  return trackerList.reduce((total, tracker) => {
    const hours = tracker.workedHours
      .filter((workedHour) => workedHour.dateId === index)
      .reduce((sum, workedHour) => sum + workedHour.value, 0);

    return total + hours;
  }, 0);
}

export const getGrandTotal = (dailyTotals: number[]) => dailyTotals.reduce(
  (total, hours) => total + hours,
  0
)

export const getWorkedHoursByDay = (index: number, tracker: vm.Dashboard) => {
  const hours = tracker.workedHours
    .filter((workedHour) => workedHour.dateId === index)
    .reduce((total, workedHour) => total + workedHour.value, 0);

  return hours;
}

export const getTotalHours = (workedHoursByDay: number[]) => workedHoursByDay.reduce(
  (total, hours) => total + hours,
  0
);
