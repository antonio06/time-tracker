import * as model from '../../data-mock';
import * as vm from '../../common/model';

export const mapToVm = (data: model.Dashboard[]): vm.Dashboard[] => {
  return data.map(item => ({
    id: item.id,
    task: item.task,
    workedHours: item.workedHours.map(wh => ({
      value: wh.value,
      taskId: wh.taskId,
      dateId: wh.dateId
    }))
  }));
}

export const createEmptyTrack = (numerOfTracks: number, numberOfDays: number): vm.Dashboard => {
  return {
    id: numerOfTracks + 1,
    task: '',
    workedHours: Array.from({ length: numberOfDays }, (_, i) => ({
      value: 0.00, taskId: numerOfTracks + 1, dateId: i
    }))
  }
};
