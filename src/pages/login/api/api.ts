import * as server from './api-model';
import { loginMock } from './api-mock';
import { loginReal } from './api-real';

export const login = async (credentials: server.UserCredentials): Promise<boolean> => {
	if (import.meta.env.VITE_IS_MOCK === 'true') {
		return loginMock(credentials);
	} else {
		return loginReal(credentials);
	}
}