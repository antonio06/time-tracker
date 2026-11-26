import { describe, it, expect } from 'vitest'
import { getDaysInMonth, getShortDayLabel, getLongDayLabel, isWeekend } from './time-helpers';

describe('time helpers specs', () => {
  it('Should return a array with the correct number of days in the month', () => {
    // Arrange
    const month = 6; // June (1-based index)
    const year = 2024;

    // Act
    const result = getDaysInMonth(month, year);

    // Assert
    expect(result.length).toBe(30);
  });
  it('Should return a array with 28 days for February in a non-leap year', () => {
    // Arrange
    const month = 2; // February (1-based index)
    const year = 2023;

    // Act
    const result = getDaysInMonth(month, year);

    // Assert
    expect(result.length).toBe(28);
  });

  it('Should return a array with 29 days for February in a leap year', () => {
    // Arrange
    const month = 2; // February (1-based index)
    const year = 2024;

    // Act
    const result = getDaysInMonth(month, year);

    // Assert
    expect(result.length).toBe(29);
  });

  it('Should return correct number of days for problematic months in 2026', () => {
    // February (non-leap year)
    expect(getDaysInMonth(2, 2026).length).toBe(28);
    // June
    expect(getDaysInMonth(6, 2026).length).toBe(30);
    // September
    expect(getDaysInMonth(9, 2026).length).toBe(30);
    // November
    expect(getDaysInMonth(11, 2026).length).toBe(30);
  });

  describe('getShortDayLabel', () => {
    it('Should return the day number and the short weekday', () => {
      // Arrange
      const dates = [new Date(2024, 5, 1), new Date(2024, 5, 30)]; // June 1, 2024 is a Saturday

      // Act
      const result = dates.map(getShortDayLabel);

      // Assert
      expect(result).toEqual(['1 Sat', '30 Sun']);
    });
  });

  describe('getLongDayLabel', () => {
    it('Should return the long weekday, the month and the day', () => {
      // Arrange
      const date = new Date(2026, 10, 2); // November 2, 2026

      // Act
      const result = getLongDayLabel(date);

      // Assert
      expect(result).toBe('Monday, November 2');
    });
  });

  describe('isWeekend', () => {
    it('Should return true for Saturday and Sunday', () => {
      // Arrange
      const dates = [new Date(2024, 5, 1), new Date(2024, 5, 2)]; // June 1 and 2, 2024

      // Act
      const result = dates.map(isWeekend);

      // Assert
      expect(result).toEqual([true, true]);
    });

    it('Should return false from Monday to Friday', () => {
      // Arrange
      const dates = Array.from({ length: 5 }, (_, index) => new Date(2024, 5, 3 + index)); // June 3 to 7, 2024

      // Act
      const result = dates.map(isWeekend);

      // Assert
      expect(result).toEqual([false, false, false, false, false]);
    });
  });
})
