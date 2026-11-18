export interface UserCredentials {
	username: string;
	password: string;
	confirmPassword: string;
}

export interface User {
	id: number;
	name: string;
}

export const createAccountInitialValues: UserCredentials = {
	username: '',
	password: '',
	confirmPassword: ''
};