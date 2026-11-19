import * as model from './api-model';

const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/login`;


export const loginMock = async (credentials: model.UserCredentials): Promise<model.User | null> => {
	// Implement the real API call here
	const response = await fetch(baseUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	});

	if (!response.ok) {
		throw new Error(`Failed to login: ${response.status}`);
	}
	return response.json();
};