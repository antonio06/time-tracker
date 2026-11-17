import { createAccountReal } from './api-real';
import { createAccountMock } from './api-mock';
import * as model from './api-model';


export const createAccount = async (credentials: model.UserCredentials): Promise<boolean> => {
	if (import.meta.env.VITE_IS_MOCK === 'true') {
		return createAccountMock(credentials);
	} else {
		return createAccountReal(credentials);
	}
}