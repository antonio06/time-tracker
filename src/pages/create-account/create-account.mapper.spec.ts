import { describe, it, expect } from 'vitest';
import * as model from './api';
import * as vm from './create-account.vm';
import { mapUserModelToUserVm, mapUserToUserCredentials } from './create-account.mapper';

describe('create-account.mapper', () => {
	describe('mapUserModelToUserVm', () => {
		it('Should map user model to user view model', () => {
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
	})

	describe('mapUserToUserCredentials', () => {
		it('Should map user to user credentials', () => {
			// Arrange
			const user: vm.UserCredentials = {
				password: 'password123',
				username: 'John Doe',
				confirmPassword: 'password123'
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
});