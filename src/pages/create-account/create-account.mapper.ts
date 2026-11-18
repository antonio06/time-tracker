import * as model from './api';
import * as vm from './create-account.vm';

export const mapUserToUserCredentials = (user: vm.UserCredentials): model.UserCredentials => ({
	name: user.username,
	password: user.password,
});

export const mapUserModelToUserVm = (user: model.User): vm.User => ({
	id: user.id,
	name: user.name,
});