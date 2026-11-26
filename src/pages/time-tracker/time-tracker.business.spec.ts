import { describe, it, expect } from 'vitest';
import { getDaysOfMonth } from './time-tracker.business';

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
});
