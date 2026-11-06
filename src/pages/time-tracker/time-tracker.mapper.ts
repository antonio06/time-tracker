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
