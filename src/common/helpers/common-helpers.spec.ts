import { describe, it, expect } from 'vitest'
import { getMonthName } from './common-helpers';

describe('common helpers specs', () => {
  describe('getMonthName', () => {
    it('Should return the correct month name for a given month number (1-12)', () => {
      // Arrange
      const monthNumber = 1;

      // Act
      const result = getMonthName(monthNumber);

      // Assert
      expect(result).toBe('January');
    });

    it('Should return an empty string for an invalid month number', () => {
      // Arrange
      const monthNumber = 13;

      // Act
      const result = getMonthName(monthNumber);

      // Assert
      expect(result).toBe('');
    });

    it('Should return December for month number 12', () => {
      // Arrange
      const monthNumber = 12;

      // Act
      const result = getMonthName(monthNumber);

      // Assert
      expect(result).toBe('December');
    });
  });
});
