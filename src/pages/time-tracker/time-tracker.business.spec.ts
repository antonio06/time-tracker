import { describe, it, expect } from 'vitest';
import { getDaysOfMonth, getDailyTotals, getGrandTotal, getWorkedHoursByDay, getTotalHours } from './time-tracker.business';
import * as vm from '../../common/model';

describe('time tracker business spec', () => {
  describe('getDaysOfMonth', () => {
    it('should return an array of days with weekdays for the given month and year', () => {
      // Arrange
      const year = 2024;
      const month = 5; // June

      // Act
      const result = getDaysOfMonth(year, month); // June 2024

      // Assert
      expect(result.length).toBe(30);
    });

    it('should return a empty array when given an invalid month', () => {
      // Arrange
      const year = 2024;
      const month = 13; // Invalid month

      // Act
      const result = getDaysOfMonth(year, month);

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('getDailyTotals', () => {
    it('should return the total hours for each day', () => {
      // Arrange
      const index = 0;
      const trackerList: vm.Dashboard[] = [
        { id: 1, task: 'Task 1', workedHours: [{ dateId: 0, value: 2, taskId: 1 }, { dateId: 1, value: 3, taskId: 2 }] },
        { id: 2, task: 'Task 2', workedHours: [{ dateId: 0, value: 4, taskId: 3 }, { dateId: 1, value: 1, taskId: 4 }] },
      ];

      // Act
      const result = getDailyTotals(index, trackerList);

      // Assert
      expect(result).toBe(6); // 2 + 4
    });

    it('should return 0 when trackerList is empty', () => {
      // Arrange
      const index = 0;
      const trackerList: vm.Dashboard[] = [];

      // Act
      const result = getDailyTotals(index, trackerList);

      // Assert
      expect(result).toBe(0);
    });

    it('should return 0 when index not matching any worked hours', () => {
      // Arrange
      const index = 2; // Index not matching any worked hours

      const trackerList: vm.Dashboard[] = [
        { id: 1, task: 'Task 1', workedHours: [{ dateId: 0, value: 2, taskId: 1 }, { dateId: 1, value: 3, taskId: 2 }] },
        { id: 2, task: 'Task 2', workedHours: [{ dateId: 0, value: 4, taskId: 3 }, { dateId: 1, value: 1, taskId: 4 }] },
      ];

      // Act
      const result = getDailyTotals(index, trackerList);

      // Assert
      expect(result).toBe(0);
    });
  });

  describe('getGrandTotal', () => {
    it('should return the total hours for all days', () => {
      // Arrange
      const dailyTotals: number[] = [2, 3, 4, 1];

      // Act
      const result = getGrandTotal(dailyTotals);

      // Assert
      expect(result).toBe(10); // 2 + 3 + 4 + 1
    });

    it('should return 0 when trackerList is empty', () => {
      // Arrange
      const dailyTotals: number[] = [];

      // Act
      const result = getGrandTotal(dailyTotals);

      // Assert
      expect(result).toBe(0);
    });
  });

  describe('getWorkedHoursByDay', () => {
    it('should return the worked hours for a specific day', () => {
      // Arrange
      const index = 0;
      const tracker: vm.Dashboard = {
        id: 1,
        task: 'Task 1',
        workedHours: [{ dateId: 0, value: 2, taskId: 1 }, { dateId: 1, value: 3, taskId: 2 }]
      };

      // Act
      const result = getWorkedHoursByDay(index, tracker);

      // Assert
      expect(result).toBe(2);
    });

    it('should return the worked hours for a specific day when multiple entries exist', () => {
      // Arrange
      const index = 0;
      const tracker: vm.Dashboard = {
        id: 1,
        task: 'Task 1',
        workedHours: [{ dateId: 0, value: 2, taskId: 1 }, { dateId: 0, value: 3, taskId: 2 }]
      };

      // Act
      const result = getWorkedHoursByDay(index, tracker);

      // Assert
      expect(result).toBe(5);
    });

    it('should return 0 when index not matching any worked hours', () => {
      // Arrange
      const index = 2; // Index not matching any worked hours
      const tracker: vm.Dashboard = {
        id: 1,
        task: 'Task 1',
        workedHours: [{ dateId: 0, value: 2, taskId: 1 }, { dateId: 1, value: 3, taskId: 2 }]
      };

      // Act
      const result = getWorkedHoursByDay(index, tracker);

      // Assert
      expect(result).toBe(0);
    });
  });

  describe('getTotalHours', () => {
    it('should return the total hours for a tracker list', () => {
      // Arrange
      const workeHoursByDay: number[] = [2, 3, 4, 1];

      // Act
      const result = getTotalHours(workeHoursByDay);

      // Assert
      expect(result).toBe(10); // 2 + 3 + 4 + 1
    });

    it('should return 0 when worked hours by day is empty', () => {
      // Arrange
      const workeHoursByDay: number[] = [];

      // Act
      const result = getTotalHours(workeHoursByDay);

      // Assert
      expect(result).toBe(0);
    });
  });
});
