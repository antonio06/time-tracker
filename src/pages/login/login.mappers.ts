import * as model from './api/api.model';
import * as vm from './login.vm';

export const mapUserToUserCredencials = (user: vm.User): model.UserCredentials => ({
	name: user.username,
	password: user.password,
});