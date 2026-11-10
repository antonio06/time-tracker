import { describe, it, expect } from 'vitest'
import { getMonthName } from './common-helpers';

describe('common helpers specs', () => {
  describe('getMonthName', () => {
    it('Should return the correct month name for a given month index', () => {
      // Arrange
      const monthIndex = 0;

      // Act
      const result = getMonthName(monthIndex);

      // Assert
      expect(result).toBe('January');
    });

    it('Should return an empty string for an invalid month index', () => {
      // Arrange
      const monthIndex = 12;

      // Act
      const result = getMonthName(monthIndex);

      // Assert
      expect(result).toBe('');
    });
  });
});
