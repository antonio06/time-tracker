import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
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
    const mockTimestamp = 1704067200000;
    const mockRandom = 0.5;

    beforeEach(() => {
      vi.spyOn(Date, 'now').mockReturnValue(mockTimestamp);
      vi.spyOn(Math, 'random').mockReturnValue(mockRandom);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('Should create an empty track with one day when number of days is one', () => {
      // Arrange
      const numberOfDays = 1;
      const month = 1;
      const year = 2024;

      const expectedId = mockTimestamp + mockRandom;

      const expectedResult: vm.DashboardVm = {
        id: expectedId,
        task: '',
        monthId: 1,
        yearId: 2024,
        workedHours: [
          { value: 0.00, taskId: expectedId, dateId: 0 },
        ],
      };

      // Act
      const result = createEmptyTrack(numberOfDays, month, year);

      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('Should create an empty track with zero days when number of days is zero', () => {
      // Arrange
      const numberOfDays = 0;
      const month = 1;
      const year = 2024;

      const expectedId = mockTimestamp + mockRandom;

      const expectedResult: vm.DashboardVm = {
        id: expectedId,
        task: '',
        monthId: month,
        yearId: year,
        workedHours: [],
      };

      // Act
      const result = createEmptyTrack(numberOfDays, month, year);

      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('Should create an empty track with the specified number of days', () => {
      // Arrange
      const numberOfDays = 3;
      const month = 1;
      const year = 2024;

      const expectedId = mockTimestamp + mockRandom;

      const expectedResult: vm.DashboardVm = {
        id: expectedId,
        task: '',
        monthId: month,
        yearId: year,
        workedHours: [
          { value: 0.00, taskId: expectedId, dateId: 0 },
          { value: 0.00, taskId: expectedId, dateId: 1 },
          { value: 0.00, taskId: expectedId, dateId: 2 },
        ],
      };

      // Act
      const result = createEmptyTrack(numberOfDays, month, year);

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});

