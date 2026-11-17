interface Route {
	login: string;
	createAccount: string;
	baseUrl: string;
}

export const routes: Route = {
	login: "/api/login",
	createAccount: "/api/create-account",
	baseUrl: "/api/dashboard",
};