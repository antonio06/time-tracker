import { describe, it, expect } from 'vitest';
import * as model from './api/api-model';
import * as vm from '@/common/model';
import { mapTaskListToVm } from './yearly-summary.mapper';

describe('yearly summary mapper specs', () => {
  describe('mapTaskListToVm', () => {
    it('Should return an empty array when feed an empty array', () => {
      // Arrange
      const value: model.DashboardModel[] = [];

      // Act
      const result = mapTaskListToVm(value);

      // Assert
      expect(result).toEqual([]);
    });

    it('Should return an empty array when feed a value that is not an array', () => {
      // Arrange
      const value = null as unknown as model.DashboardModel[];

      // Act
      const result = mapTaskListToVm(value);

      // Assert
      expect(result).toEqual([]);
    });

    it('Should return a view model Dashboard array with the tasks of every month', () => {
      // Arrange
      const taskList: model.DashboardModel[] = [
        {
          id: 1,
          task: 'Task 1',
          monthId: 1,
          yearId: 2026,
          workedHours: [
            { value: 4.50, taskId: 1, dateId: 0 },
            { value: 7.00, taskId: 1, dateId: 1 },
          ],
        },
        {
          id: 2,
          task: 'Task 2',
          monthId: 11,
          yearId: 2026,
          workedHours: [
            { value: 0.50, taskId: 2, dateId: 29 },
          ],
        },
      ];

      const expectedResult: vm.DashboardVm[] = [
        {
          id: 1,
          task: 'Task 1',
          monthId: 1,
          yearId: 2026,
          workedHours: [
            { value: 4.50, taskId: 1, dateId: 0 },
            { value: 7.00, taskId: 1, dateId: 1 },
          ],
        },
        {
          id: 2,
          task: 'Task 2',
          monthId: 11,
          yearId: 2026,
          workedHours: [
            { value: 0.50, taskId: 2, dateId: 29 },
          ],
        },
      ];

      // Act
      const result = mapTaskListToVm(taskList);

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
