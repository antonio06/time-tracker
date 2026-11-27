import { describe, it, expect } from 'vitest';
import * as model from './api/api-model';
import * as vm from './login.vm';
import { mapUserModelToUserVm, mapUserToUserCredentials } from './login.mapper';

describe('login.mapper', () => {
	it('should map user model to user view model', () => {
		// Arrange
		const userModel: model.User = {
			id: 1,
			name: 'John Doe',
		};

		const expectedUserVm: vm.User = {
			id: 1,
			name: 'John Doe'
		};

		// Act
		const userVm = mapUserModelToUserVm(userModel);

		// Assert
		expect(userVm).toEqual(expectedUserVm);
	});

	it('should map user to user credentials', () => {
		// Arrange
		const user: vm.UserCredentials = {
			password: 'password123',
			username: 'John Doe'
		};

		const expectedResult: model.UserCredentials = {
			name: 'John Doe',
			password: 'password123'
		}

		// Act
		const credentials = mapUserToUserCredentials(user);

		// Assert
		expect(credentials).toEqual(expectedResult);
	});
});