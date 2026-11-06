import * as vm from '../../model';

export const getTotalWorkedHoursPerTask = (workedHours: vm.WorkedHours[]): number => {
  return workedHours.reduce((total, workHour) => {
    return workHour.value + total;
  }, 0)
}

export const getTotalWorkedHoursPerDay = (dayId: number, trackList: vm.Dashboard[]): number => {
  return trackList.reduce((total, track) => {
    const workHour = track.workedHours.find(wh => wh.dateId === dayId);
    return workHour ? total + workHour.value : total;
  }, 0)
}

export const getTotalWorkedPerTotal = (trackList: vm.Dashboard[]) => trackList.reduce((total, track) => total + getTotalWorkedHoursPerTask(track.workedHours), 0);

export const getRoundPerTwoDigits = (value: number) => value.toFixed(2);
