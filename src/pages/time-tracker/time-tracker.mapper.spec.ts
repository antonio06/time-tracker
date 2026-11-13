import { describe, it, expect } from 'vitest';
import * as model from '../../common';
import * as vm from '../../common/model';
import { mapToVm, createEmptyTrack } from './time-tracker.mapper';

describe('time tracker mapper specs', () => {
  describe('mapToVm', () => {
    it('Should return a empty array when feed a empty array', () => {
      // Arrangemodel.Dashboard[]
      const value: model.DashboardModel[] = [];

      // Act
      const result = mapToVm(value);

      // Assert
      expect(result).toEqual([]);
    });

    it('Should return a view model Dashboard array when feed a model Dashboard', () => {
      // Arrange

      const dashboard: model.DashboardModel[] = [
        {
          id: 1,
          task: 'Task 1',
          monthId: 1,
          yearId: 2024,
          workedHours: [
            { value: 0.00, taskId: 1, dateId: 0 },
            { value: 0.50, taskId: 1, dateId: 1 },
          ],
        },
      ];

      const expectedResult: vm.DashboardVm[] = [
        {
          id: 1,
          task: 'Task 1',
          monthId: 1,
          yearId: 2024,
          workedHours: [
            { value: 0.00, taskId: 1, dateId: 0 },
            { value: 0.50, taskId: 1, dateId: 1 },
          ],
        },
      ];

      // Act
      const result = mapToVm(dashboard);

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('createEmptyTrack', () => {
    it('Should create an empty track with one day when number of days is one', () => {
      // Arrange
      const numberOfTracks = 0;
      const numberOfDays = 1;
      const month = 1;
      const year = 2024;

      const expectedResult: vm.DashboardVm = {
        id: numberOfTracks + 1,
        task: '',
        monthId: 1,
        yearId: 2024,
        workedHours: [
          { value: 0.00, taskId: numberOfTracks + 1, dateId: 0 },
        ],
      };

      // Act
      const result = createEmptyTrack(numberOfTracks, numberOfDays, month, year);

      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('Should create an empty track with zero days when number of days is zero', () => {
      // Arrange
      const numberOfTracks = 2;
      const numberOfDays = 0;
      const month = 1;
      const year = 2024;

      const expectedResult: vm.DashboardVm = {
        id: numberOfTracks + 1,
        task: '',
        monthId: month,
        yearId: year,
        workedHours: [],
      };

      // Act
      const result = createEmptyTrack(numberOfTracks, numberOfDays, month, year);

      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('Should create an empty track with the specified number of days', () => {
      // Arrange
      const numberOfTracks = 2;
      const numberOfDays = 3;
      const month = 1;
      const year = 2024;

      const expectedResult: vm.DashboardVm = {
        id: numberOfTracks + 1,
        task: '',
        monthId: month,
        yearId: year,
        workedHours: [
          { value: 0.00, taskId: numberOfTracks + 1, dateId: 0 },
          { value: 0.00, taskId: numberOfTracks + 1, dateId: 1 },
          { value: 0.00, taskId: numberOfTracks + 1, dateId: 2 },
        ],
      };

      // Act
      const result = createEmptyTrack(numberOfTracks, numberOfDays, month, year);

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
