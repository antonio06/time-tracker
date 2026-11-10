import { describe, it, expect } from 'vitest'
import { getDaysInMonth } from './time-helpers';

describe('time helpers specs', () => {
  it('Should return a array with the correct number of days in the month', () => {
    // Arrange
    const month = 5; // June (0-based index)
    const year = 2024;

    // Act
    const result = getDaysInMonth(month, year);

    // Assert
    expect(result.length).toBe(30);
  });
  it('Should return a array with 28 days for February in a non-leap year', () => {
    // Arrange
    const month = 1; // February (0-based index)
    const year = 2023;

    // Act
    const result = getDaysInMonth(month, year);

    // Assert
    expect(result.length).toBe(28);
  });

  it('Should return a array with 29 days for February in a leap year', () => {
    // Arrange
    const month = 1; // February (0-based index)
    const year = 2024;

    // Act
    const result = getDaysInMonth(month, year);

    // Assert
    expect(result.length).toBe(29);
  });
})
