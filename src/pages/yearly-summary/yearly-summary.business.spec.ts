import { describe, it, expect } from 'vitest';
import * as vm from '@/common/model';
import { getWorkingDaysInYear, getYearTotal, getYearlySummary } from './yearly-summary.business';

const createTracker = (
  id: number,
  monthId: number,
  yearId: number,
  workedHours: Omit<vm.WorkedHoursVm, 'taskId'>[]
): vm.DashboardVm => ({
  id,
  task: `Task ${id}`,
  monthId,
  yearId,
  workedHours: workedHours.map((workedHour) => ({ ...workedHour, taskId: id })),
});

describe('yearly summary business spec', () => {
  describe('getWorkingDaysInYear', () => {
    it('Should return 261 working days for 2026', () => {
      // Arrange
      const year = 2026; // Starts on a Thursday

      // Act
      const result = getWorkingDaysInYear(year);

      // Assert
      expect(result).toBe(261);
    });

    it('Should return 262 working days for 2024, a leap year that starts on a Monday', () => {
      // Arrange
      const year = 2024;

      // Act
      const result = getWorkingDaysInYear(year);

      // Assert
      expect(result).toBe(262);
    });

    it('Should return 260 working days for 2022, a year that starts on a Saturday', () => {
      // Arrange
      const year = 2022;

      // Act
      const result = getWorkingDaysInYear(year);

      // Assert
      expect(result).toBe(260);
    });
  });

  describe('getYearTotal', () => {
    it('Should return 0 when the task list is empty', () => {
      // Arrange
      const trackerList: vm.DashboardVm[] = [];

      // Act
      const result = getYearTotal(trackerList, 2026);

      // Assert
      expect(result).toBe(0);
    });

    it('Should add up the hours of the tasks of every month of the year', () => {
      // Arrange
      const trackerList = [
        createTracker(1, 1, 2026, [{ dateId: 0, value: 4.5 }, { dateId: 1, value: 3 }]),
        createTracker(2, 11, 2026, [{ dateId: 2, value: 2.5 }]),
        createTracker(3, 11, 2026, [{ dateId: 2, value: 1 }, { dateId: 3, value: 0.5 }]),
      ];

      // Act
      const result = getYearTotal(trackerList, 2026);

      // Assert
      expect(result).toBe(11.5);
    });

    it('Should ignore the tasks of other years', () => {
      // Arrange
      const trackerList = [
        createTracker(1, 1, 2026, [{ dateId: 0, value: 4 }]),
        createTracker(2, 1, 2025, [{ dateId: 0, value: 8 }]),
        createTracker(3, 12, 2027, [{ dateId: 0, value: 8 }]),
      ];

      // Act
      const result = getYearTotal(trackerList, 2026);

      // Assert
      expect(result).toBe(4);
    });

    it('Should only count the days of the month of each task', () => {
      // Arrange
      // dateId 30 is the 31st: it exists in January but not in November, which has 30 days
      const trackerList = [
        createTracker(1, 1, 2026, [{ dateId: 30, value: 2 }]),
        createTracker(2, 11, 2026, [{ dateId: 29, value: 3 }, { dateId: 30, value: 5 }]),
      ];

      // Act
      const result = getYearTotal(trackerList, 2026);

      // Assert
      expect(result).toBe(5);
    });

    it('Should ignore the tasks with a month outside 1 to 12', () => {
      // Arrange
      const trackerList = [
        createTracker(1, 3, 2026, [{ dateId: 0, value: 1 }]),
        createTracker(2, 0, 2026, [{ dateId: 0, value: 8 }]),
        createTracker(3, 13, 2026, [{ dateId: 0, value: 8 }]),
      ];

      // Act
      const result = getYearTotal(trackerList, 2026);

      // Assert
      expect(result).toBe(1);
    });

    it('Should count the hours worked on weekends', () => {
      // Arrange
      // November 1, 2026 is a Sunday and November 7 is a Saturday
      const trackerList = [
        createTracker(1, 11, 2026, [{ dateId: 0, value: 2 }, { dateId: 6, value: 3 }]),
      ];

      // Act
      const result = getYearTotal(trackerList, 2026);

      // Assert
      expect(result).toBe(5);
    });
  });

  describe('getYearlySummary', () => {
    it('Should return the year total and the average per working day', () => {
      // Arrange
      // 2026 has 261 working days, so 522 hours are 2 hours per working day
      const trackerList = [
        createTracker(1, 1, 2026, [{ dateId: 0, value: 261 }]),
        createTracker(2, 11, 2026, [{ dateId: 0, value: 261 }]),
      ];

      // Act
      const result = getYearlySummary(trackerList, 2026);

      // Assert
      expect(result).toEqual({ totalWorkHoursByYear: 522, averageWorkHours: 2 });
    });

    it('Should return 0 hours and a 0 average when the task list is empty', () => {
      // Arrange
      const trackerList: vm.DashboardVm[] = [];

      // Act
      const result = getYearlySummary(trackerList, 2026);

      // Assert
      expect(result).toEqual({ totalWorkHoursByYear: 0, averageWorkHours: 0 });
    });
  });
});
