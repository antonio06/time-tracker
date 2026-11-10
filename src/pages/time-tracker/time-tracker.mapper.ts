import * as model from '../../data-mock';
import * as vm from '../../common/model';

export const mapToVm = (data: model.Dashboard[]): vm.Dashboard[] => {
  return Array.isArray(data) ? data.map(item => ({
    id: item.id,
    task: item.task,
    workedHours: mapWorkdHoursToVm(item.workedHours)
  })) : [];
}

const mapWorkdHoursToVm = (workedHours: model.WorkedHours[]): vm.WorkedHours[] => {
  return workedHours.map(wh => ({
    value: wh.value,
    taskId: wh.taskId,
    dateId: wh.dateId
  }));
}

export const createEmptyTrack = (numberOfTracks: number, numberOfDays: number): vm.Dashboard => ({
  id: numberOfTracks + 1,
  task: '',
  workedHours: Array.from({ length: numberOfDays }, (_, i) => ({
    value: 0.00, taskId: numberOfTracks + 1, dateId: i
  }))
});
