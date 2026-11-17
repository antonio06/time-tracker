export interface UserCredentials {
	username: string;
	password: string;
}

export const emptyUser: UserCredentials = { username: '', password: '' };