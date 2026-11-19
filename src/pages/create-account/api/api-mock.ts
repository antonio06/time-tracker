import * as model from './api-model';

const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/create-account`;


export const createAccountMock = async (credentials: model.UserCredentials): Promise<model.User> => {
	// Implement the real API call here
	const response = await fetch(baseUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	});

	if (!response.ok) {
		const body = await response.json().catch(() => null);
		throw new Error(body?.error ?? `Status ${response.status}`);
	}
	return response.json();
};