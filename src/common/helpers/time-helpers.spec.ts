import { describe, it, expect } from 'vitest'
import { getDaysInMonth } from './time-helpers';

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
})
