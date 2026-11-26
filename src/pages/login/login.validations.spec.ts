import { describe, it, expect } from 'vitest';
import { validateUserCredentials } from './login.validations';
import * as vm from './login.vm';

describe('login validations specs', () => {
	it('Should return error for empty username and password', () => {
		// Arrange
		const userCredentials: vm.UserCredentials = { username: '', password: '' };
		const expectedResult = 'Username is required\nPassword is required\n';

		// Act
		const errors = validateUserCredentials(userCredentials);

		// Assert
		expect(errors).toBe(expectedResult);
	});

	it('Should return error for empty username', () => {
		// Arrange
		const userCredentials: vm.UserCredentials = { username: '', password: 'password123' };
		const expectedResult = 'Username is required\n';

		// Act
		const errors = validateUserCredentials(userCredentials);

		// Assert
		expect(errors).toBe(expectedResult);
	});

	it('Should return error for empty password', () => {
		// Arrange
		const userCredentials: vm.UserCredentials = { username: 'user123', password: '' };
		const expectedResult = 'Password is required\n';

		// Act
		const errors = validateUserCredentials(userCredentials);

		// Assert
		expect(errors).toBe(expectedResult);
	});
});