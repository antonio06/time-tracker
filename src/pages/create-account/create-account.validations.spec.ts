import { describe, it, expect } from 'vitest'
import { validateUserCredentials } from './create-account.validations';
import * as vm from './create-account.vm';

describe('validateUserCredentials', () => {
	it('Should return errors for empty fields', () => {
		// Arrange
		const userCredentials: vm.UserCredentials = { username: '', password: '', confirmPassword: '' };
		const expectedResult = 'Username is required\nPassword is required\n';

		// Act
		const errors = validateUserCredentials(userCredentials);

		// Assert
		expect(errors).toBe(expectedResult);
	});

	it('Should return no errors for valid fields', () => {

		// Arrange
		const userCredentials: vm.UserCredentials = { username: 'testuser', password: 'password123', confirmPassword: 'password123' };

		// Act
		const errors = validateUserCredentials(userCredentials);

		// Assert
		expect(errors).toEqual('');
	});

	it('Should return error for mismatched passwords', () => {
		// Arrange
		const userCredentials: vm.UserCredentials = { username: 'testuser', password: 'password123', confirmPassword: 'password456' };
		const expectedResult = 'Passwords do not match\n';

		// Act
		const errors = validateUserCredentials(userCredentials);

		// Assert
		expect(errors).toBe(expectedResult);
	});
});