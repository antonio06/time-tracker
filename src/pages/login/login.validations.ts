import * as vm from './login.vm';

export const validateUserCredentials = (userCredentials: vm.UserCredentials) => {
	let errors: string = '';

	if (!userCredentials.username) {
		errors += "Username is required\n";
	}

	if (!userCredentials.password) {
		errors += "Password is required\n";
	}

	return errors;
};