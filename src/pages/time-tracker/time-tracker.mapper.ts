import * as model from '../../common';
import * as vm from '../../common/model';

export const mapToVm = (data: model.DashboardModel[]): vm.DashboardVm[] => {
  return Array.isArray(data) ? data.map(item => ({
    id: item.id,
    task: item.task,
    monthId: item.monthId,
    yearId: item.yearId,
    workedHours: mapWorkdHoursToVm(item.workedHours)
  })) : [];
}

const mapWorkdHoursToVm = (workedHours: model.WorkedHoursModel[]): vm.WorkedHoursVm[] => {
  return workedHours.map(wh => ({
    value: wh.value,
    taskId: wh.taskId,
    dateId: wh.dateId
  }));
}

export const createEmptyTrack = (numberOfTracks: number, numberOfDays: number, month: number, year: number): vm.DashboardVm => ({
  id: numberOfTracks + 1,
  task: '',
  monthId: month,
  yearId: year,
  workedHours: Array.from({ length: numberOfDays }, (_, i) => ({
    value: 0.00, taskId: numberOfTracks + 1, dateId: i
  }))
});

export const mapToModel = (data: vm.DashboardVm[]): model.DashboardModel[] => {
  return Array.isArray(data) ? data.map(item => ({
    id: item.id,
    task: item.task,
    monthId: item.monthId,
    yearId: item.yearId,
    workedHours: mapWorkedHoursToModel(item.workedHours)
  })) : [];
}

const mapWorkedHoursToModel = (workedHours: vm.WorkedHoursVm[]): model.WorkedHoursModel[] => {
  return workedHours.map(wh => ({
    value: wh.value,
    taskId: wh.taskId,
    dateId: wh.dateId
  }));
}
