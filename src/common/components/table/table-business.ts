import * as vm from '../../model';

export const getTotalWorkedHoursPerTask = (workedHours: vm.WorkedHoursVm[]): number => {
  return Array.isArray(workedHours) ? workedHours.reduce((total, workHour) => {
    return workHour.value + total;
  }, 0) : 0;
}

export const getTotalWorkedHoursPerDay = (dayId: number, trackList: vm.DashboardVm[]): number => {
  return Array.isArray(trackList) ? trackList.reduce((total, track) => {
    const workHour = track.workedHours.find(wh => wh.dateId === dayId);
    return workHour ? total + workHour.value : total;
  }, 0) : 0;
}

export const getTotalWorkedPerTotal = (trackList: vm.DashboardVm[]) => Array.isArray(trackList) ? trackList.reduce((total, track) => total + getTotalWorkedHoursPerTask(track.workedHours), 0) : 0;

export const getRoundPerTwoDigits = (value: number) => value ? value.toFixed(2) : '0.00';
