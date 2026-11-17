import * as vm from './create-account.vm';

export const validateUserCredentials = (userCredentials: vm.UserCredentials) => {
	let errors: string = '';

	if (!userCredentials.username) {
		errors += "Username is required\n";
	}

	if (!userCredentials.password) {
		errors += "Password is required\n";
	}

	if (userCredentials.password !== userCredentials.confirmPassword) {
		errors += "Passwords do not match\n";
	}

	return errors;
};