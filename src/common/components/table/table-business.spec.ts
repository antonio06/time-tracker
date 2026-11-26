import { describe, it, expect } from 'vitest';
import { getRoundPerTwoDigits } from './table-business';

describe('table business specs', () => {
  describe('getRoundPerTwoDigits', () => {
    it('Should round a number to two decimal places', () => {
      // Arrange
      const value = 3.14159;

      // Act
      const result = getRoundPerTwoDigits(value);

      // Assert
      expect(result).toBe('3.14');
    });

    it('Should handle numbers with less than two decimal places', () => {
      // Arrange
      const value = 2.5;

      // Act
      const result = getRoundPerTwoDigits(value);

      // Assert
      expect(result).toBe('2.50');
    });
  });
});
