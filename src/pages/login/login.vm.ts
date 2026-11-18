export interface UserCredentials {
	username: string;
	password: string;
}

export interface User {
	id: number;
	name: string;
}

export const emptyUser: UserCredentials = { username: '', password: '' };