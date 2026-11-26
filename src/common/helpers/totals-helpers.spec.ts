import { describe, it, expect } from 'vitest';
import * as vm from '@/common/model';
import { getTaskHoursByDay, getDayTotal, getTaskTotal, getMonthTotal } from './totals-helpers';

const DAYS_IN_MONTH = 30; // November 2026

const createTracker = (id: number, workedHours: Omit<vm.WorkedHoursVm, 'taskId'>[]): vm.DashboardVm => ({
  id,
  task: `Task ${id}`,
  monthId: 11,
  yearId: 2026,
  workedHours: workedHours.map((workedHour) => ({ ...workedHour, taskId: id })),
});

describe('totals helpers specs', () => {
  describe('getTaskHoursByDay', () => {
    it('Should return the hours of the task on the given day', () => {
      // Arrange
      const tracker = createTracker(1, [{ dateId: 0, value: 2 }, { dateId: 1, value: 3 }]);

      // Act
      const result = getTaskHoursByDay(tracker, 0);

      // Assert
      expect(result).toBe(2);
    });

    it('Should add up every entry of the day when there is more than one', () => {
      // Arrange
      const tracker = createTracker(1, [{ dateId: 0, value: 2 }, { dateId: 0, value: 3 }]);

      // Act
      const result = getTaskHoursByDay(tracker, 0);

      // Assert
      expect(result).toBe(5);
    });

    it('Should return 0 when the task has no entry for the given day', () => {
      // Arrange
      const tracker = createTracker(1, [{ dateId: 0, value: 2 }, { dateId: 1, value: 3 }]);

      // Act
      const result = getTaskHoursByDay(tracker, 2);

      // Assert
      expect(result).toBe(0);
    });
  });

  describe('getDayTotal', () => {
    it('Should add up the hours of every task on the given day', () => {
      // Arrange
      const trackerList = [
        createTracker(1, [{ dateId: 0, value: 2 }, { dateId: 1, value: 3 }]),
        createTracker(2, [{ dateId: 0, value: 4 }, { dateId: 1, value: 0.5 }]),
      ];

      // Act
      const result = getDayTotal(trackerList, 0);

      // Assert
      expect(result).toBe(6); // 2 + 4
    });

    it('Should return 0 when the list is empty', () => {
      // Arrange
      const trackerList: vm.DashboardVm[] = [];

      // Act
      const result = getDayTotal(trackerList, 0);

      // Assert
      expect(result).toBe(0);
    });

    it('Should return 0 when no task has hours on the given day', () => {
      // Arrange
      const trackerList = [
        createTracker(1, [{ dateId: 0, value: 2 }, { dateId: 1, value: 3 }]),
        createTracker(2, [{ dateId: 0, value: 4 }, { dateId: 1, value: 0.5 }]),
      ];

      // Act
      const result = getDayTotal(trackerList, 2);

      // Assert
      expect(result).toBe(0);
    });

    it('Should add up every entry of a task on that day when it has more than one', () => {
      // Arrange
      const trackerList = [
        createTracker(1, [{ dateId: 0, value: 2 }, { dateId: 0, value: 1.5 }, { dateId: 1, value: 3 }]),
        createTracker(2, [{ dateId: 0, value: 4 }]),
      ];

      // Act
      const result = getDayTotal(trackerList, 0);

      // Assert
      expect(result).toBe(7.5); // 2 + 1.5 + 4, not only the first entry of task 1
    });
  });

  describe('getTaskTotal', () => {
    it('Should add up the hours of every day of the month', () => {
      // Arrange
      const tracker = createTracker(1, [
        { dateId: 0, value: 1.5 },
        { dateId: 1, value: 2 },
        { dateId: 2, value: 4 },
        { dateId: 3, value: 1 },
      ]);

      // Act
      const result = getTaskTotal(tracker, DAYS_IN_MONTH);

      // Assert
      expect(result).toBe(8.5);
    });

    it('Should return 0 when the task has no worked hours', () => {
      // Arrange
      const tracker = createTracker(1, []);

      // Act
      const result = getTaskTotal(tracker, DAYS_IN_MONTH);

      // Assert
      expect(result).toBe(0);
    });

    it('Should ignore the hours outside the days of the month', () => {
      // Arrange
      const tracker = createTracker(1, [
        { dateId: -1, value: 1 },
        { dateId: 0, value: 2 }, // first day of the month
        { dateId: 29, value: 3 }, // last day of the month
        { dateId: 30, value: 5 },
      ]);

      // Act
      const result = getTaskTotal(tracker, DAYS_IN_MONTH);

      // Assert
      expect(result).toBe(5); // 2 + 3
    });
  });

  describe('getMonthTotal', () => {
    it('Should add up the totals of every task', () => {
      // Arrange
      const trackerList = [
        createTracker(1, [{ dateId: 0, value: 2 }, { dateId: 1, value: 3 }]),
        createTracker(2, [{ dateId: 2, value: 4 }, { dateId: 3, value: 1 }]),
      ];

      // Act
      const result = getMonthTotal(trackerList, DAYS_IN_MONTH);

      // Assert
      expect(result).toBe(10); // 2 + 3 + 4 + 1
    });

    it('Should count every entry of a day when a task has more than one', () => {
      // Arrange
      const trackerList = [
        createTracker(1, [{ dateId: 0, value: 1.5 }, { dateId: 1, value: 2 }, { dateId: 1, value: 3 }]),
      ];

      // Act
      const result = getMonthTotal(trackerList, DAYS_IN_MONTH);

      // Assert
      expect(result).toBe(6.5);
    });

    it('Should return 0 when the list is empty', () => {
      // Arrange
      const trackerList: vm.DashboardVm[] = [];

      // Act
      const result = getMonthTotal(trackerList, DAYS_IN_MONTH);

      // Assert
      expect(result).toBe(0);
    });

    it('Should ignore the hours outside the month and match the sum of the day totals', () => {
      // Arrange
      const trackerList = [
        createTracker(1, [{ dateId: 0, value: 2 }, { dateId: 0, value: 1.5 }, { dateId: 29, value: 3 }, { dateId: 30, value: 5 }]),
        createTracker(2, [{ dateId: 0, value: 4 }, { dateId: 1, value: 1 }]),
      ];

      // Act
      const result = getMonthTotal(trackerList, DAYS_IN_MONTH);

      // Assert
      const sumOfDayTotals = Array.from({ length: DAYS_IN_MONTH }, (_, dateId) => getDayTotal(trackerList, dateId))
        .reduce((total, dayTotal) => total + dayTotal, 0);
      expect(result).toBe(11.5); // (2 + 1.5 + 3) + (4 + 1)
      expect(result).toBe(sumOfDayTotals);
    });
  });
});
