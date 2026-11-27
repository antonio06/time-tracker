import { describe, it, expect } from 'vitest';
import * as vm from '@/common/model';
import { getTaskHoursByDay, getTaskTotal } from '@/common/helpers';
import { getDaysOfMonth, updateTaskHoursByDay } from './time-tracker.business';

const DAYS_IN_MONTH = 30; // November 2026

const createTracker = (id: number, workedHours: Omit<vm.WorkedHoursVm, 'taskId'>[]): vm.DashboardVm => ({
  id,
  task: `Task ${id}`,
  monthId: 11,
  yearId: 2026,
  workedHours: workedHours.map((workedHour) => ({ ...workedHour, taskId: id })),
});

describe('time tracker business spec', () => {
  describe('getDaysOfMonth', () => {
    it('Should return an array of days with weekdays for the given month and year', () => {
      // Arrange
      const year = 2024;
      const month = 6; // June (1-based)

      // Act
      const result = getDaysOfMonth(month, year); // June 2024

      // Assert
      expect(result.length).toBe(30);
    });

    it('Should label each day with its number and short weekday', () => {
      // Arrange
      const year = 2024;
      const month = 6; // June (1-based), June 1, 2024 is a Saturday

      // Act
      const result = getDaysOfMonth(month, year);

      // Assert
      expect(result.slice(0, 7)).toEqual(['1 Sat', '2 Sun', '3 Mon', '4 Tue', '5 Wed', '6 Thu', '7 Fri']);
      expect(result[29]).toBe('30 Sun');
    });

    it('Should return a empty array when given an invalid month', () => {
      // Arrange
      const year = 2024;
      const month = 13; // Invalid month

      // Act
      const result = getDaysOfMonth(month, year);

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('updateTaskHoursByDay', () => {
    it('Should set the hours of the day and keep the other days as they are', () => {
      // Arrange
      const tracker = createTracker(1, [{ dateId: 0, value: 2 }, { dateId: 1, value: 3 }, { dateId: 2, value: 1 }]);

      // Act
      const result = updateTaskHoursByDay(tracker, 1, 7.5);

      // Assert
      expect(result).toEqual(createTracker(1, [{ dateId: 0, value: 2 }, { dateId: 1, value: 7.5 }, { dateId: 2, value: 1 }]));
      expect(getTaskHoursByDay(result, 1)).toBe(7.5);
    });

    it('Should leave a single entry with the typed value when the day has several entries', () => {
      // Arrange
      const tracker = createTracker(1, [{ dateId: 0, value: 1 }, { dateId: 1, value: 2 }, { dateId: 1, value: 3 }]);

      // Act
      const result = updateTaskHoursByDay(tracker, 1, 4);

      // Assert
      expect(result.workedHours).toEqual([
        { dateId: 0, value: 1, taskId: 1 },
        { dateId: 1, value: 4, taskId: 1 },
      ]);
      expect(getTaskHoursByDay(result, 1)).toBe(4); // not 8, which is what setting every entry of the day would give
      expect(getTaskTotal(result, DAYS_IN_MONTH)).toBe(5); // 1 + 4
    });

    it('Should add an entry with the task id when the day has none', () => {
      // Arrange
      const tracker = createTracker(1, [{ dateId: 0, value: 2 }, { dateId: 2, value: 3 }]);

      // Act
      const result = updateTaskHoursByDay(tracker, 1, 5);

      // Assert
      expect(result.workedHours).toEqual([
        { dateId: 0, value: 2, taskId: 1 },
        { dateId: 1, value: 5, taskId: 1 },
        { dateId: 2, value: 3, taskId: 1 },
      ]);
      expect(getTaskHoursByDay(result, 1)).toBe(5);
      expect(getTaskTotal(result, DAYS_IN_MONTH)).toBe(10); // 2 + 5 + 3
    });

    it('Should keep the entries outside the month untouched', () => {
      // Arrange
      const tracker = createTracker(1, [{ dateId: -1, value: 1 }, { dateId: 0, value: 2 }, { dateId: 30, value: 8 }]);

      // Act
      const result = updateTaskHoursByDay(tracker, 0, 6);

      // Assert
      expect(result.workedHours).toEqual([
        { dateId: -1, value: 1, taskId: 1 },
        { dateId: 0, value: 6, taskId: 1 },
        { dateId: 30, value: 8, taskId: 1 },
      ]);
      expect(getTaskTotal(result, DAYS_IN_MONTH)).toBe(6); // the hours outside the month are not counted
    });

    it('Should use the task id even when the old entry had another taskId', () => {
      // Arrange
      const tracker: vm.DashboardVm = {
        ...createTracker(1, []),
        workedHours: [{ dateId: 0, value: 2, taskId: 99 }],
      };

      // Act
      const result = updateTaskHoursByDay(tracker, 0, 3);

      // Assert
      expect(result.workedHours).toEqual([{ dateId: 0, value: 3, taskId: 1 }]);
    });

    it('Should not change the original task', () => {
      // Arrange
      const tracker = createTracker(1, [{ dateId: 1, value: 2 }, { dateId: 0, value: 3 }, { dateId: 1, value: 1 }]);
      const original = structuredClone(tracker);

      // Act
      updateTaskHoursByDay(tracker, 1, 4);

      // Assert
      expect(tracker).toEqual(original);
    });
  });
});
