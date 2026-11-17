export interface UserCredentials {
	username: string;
	password: string;
	confirmPassword: string;
}

export const createAccountInitialValues: UserCredentials = {
	username: '',
	password: '',
	confirmPassword: ''
};