import * as model from './api.model';

const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/login`;


export const loginMock = async (credentials: model.UserCredentials): Promise<boolean> => {
	// Implement the real API call here
	const response = await fetch(baseUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	});
	return response.ok && (await response.json());
};