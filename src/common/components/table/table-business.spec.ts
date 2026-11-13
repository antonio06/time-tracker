import { describe, it, expect } from 'vitest';
import * as vm from '../../model';
import { getTotalWorkedHoursPerTask, getTotalWorkedHoursPerDay, getTotalWorkedPerTotal, getRoundPerTwoDigits } from './table-business';

describe('table business specs', () => {
  describe('getTotalWorkedHoursPerTask', () => {
    it('Should return zero when feed a empty array', () => {
      // Arrange
      const workedHours: vm.WorkedHoursVm[] = [];

      // Act
      const result = getTotalWorkedHoursPerTask(workedHours);

      // Assert
      expect(result).toBe(0);
    });

    it('Should return the total worked hours for a non-empty array', () => {
      // Arrange
      const workedHours: vm.WorkedHoursVm[] = [
        { value: 1.5, taskId: 1, dateId: 0 },
        { value: 2.0, taskId: 1, dateId: 1 },
      ];

      // Act
      const result = getTotalWorkedHoursPerTask(workedHours);

      // Assert
      expect(result).toBe(3.5);
    });
  });

  describe('getTotalWorkedHoursPerDay', () => {
    it('Should return zero when feed a empty array', () => {
      // Arrange
      const dayId = 0;
      const workedHours: vm.DashboardVm[] = [];

      // Act
      const result = getTotalWorkedHoursPerDay(dayId, workedHours);

      // Assert
      expect(result).toBe(0);
    });

    it('Should return zero, when there are no day id that match with the given dayId', () => {
      // Arrange
      const dayId = 2;
      const workedHours: vm.DashboardVm[] = [
        {
          id: 1,
          task: 'Task 1',
          monthId: 10,
          yearId: 2026,
          workedHours: [
            { value: 0.00, taskId: 1, dateId: 0 },
            { value: 0.50, taskId: 1, dateId: 1 },
          ],
        },
      ];

      // Act
      const result = getTotalWorkedHoursPerDay(dayId, workedHours);

      // Assert
      expect(result).toBe(0);
    });

    it('Should return the total worked hours for a non-empty array', () => {
      // Arrange
      const dayId = 1;
      const workedHours: vm.DashboardVm[] = [
        {
          id: 1,
          monthId: 10,
          yearId: 2026,
          task: 'Task 1',
          workedHours: [
            { value: 0.00, taskId: 1, dateId: 0 },
            { value: 0.50, taskId: 1, dateId: 1 },
          ],
        },
      ];

      // Act
      const result = getTotalWorkedHoursPerDay(dayId, workedHours);

      // Assert
      expect(result).toBe(0.5);
    });
  });

  describe('getTotalWorkedPerTotal', () => {
    it('Should return zero when feed a empty array', () => {
      // Arrange
      const workedHours: vm.DashboardVm[] = [];

      // Act
      const result = getTotalWorkedPerTotal(workedHours);

      // Assert
      expect(result).toBe(0);
    });

    it('Should return the total worked hours for a non-empty array', () => {
      // Arrange
      const workedHours: vm.DashboardVm[] = [
        {
          id: 1,
          monthId: 10,
          yearId: 2026,
          task: 'Task 1',
          workedHours: [
            { value: 1.5, taskId: 1, dateId: 0 },
            { value: 2.0, taskId: 1, dateId: 1 },
            { value: 3.0, taskId: 1, dateId: 1 },
          ],
        },
      ];

      // Act
      const result = getTotalWorkedPerTotal(workedHours);

      // Assert
      expect(result).toBe(6.5);
    });
  });

  describe('getRoundPerTwoDigits', () => {
    it('Should round a number to two decimal places', () => {
      // Arrange
      const value = 3.14159;

      // Act
      const result = getRoundPerTwoDigits(value);

      // Assert
      expect(result).toBe('3.14');
    });

    it('Should handle numbers with less than two decimal places', () => {
      // Arrange
      const value = 2.5;

      // Act
      const result = getRoundPerTwoDigits(value);

      // Assert
      expect(result).toBe('2.50');
    });
  });
});
