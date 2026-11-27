import * as model from './api/api-model';
import * as vm from '@/common/model';

// Maps to the shared DashboardVm so the totals helpers of @/common/helpers can be reused
export const mapTaskListToVm = (data: model.DashboardModel[]): vm.DashboardVm[] => {
  return Array.isArray(data) ? data.map(item => ({
    id: item.id,
    task: item.task,
    monthId: item.monthId,
    yearId: item.yearId,
    workedHours: mapWorkedHoursToVm(item.workedHours)
  })) : [];
};

const mapWorkedHoursToVm = (workedHours: model.WorkedHoursModel[]): vm.WorkedHoursVm[] => {
  return Array.isArray(workedHours) ? workedHours.map(wh => ({
    value: wh.value,
    taskId: wh.taskId,
    dateId: wh.dateId
  })) : [];
};
