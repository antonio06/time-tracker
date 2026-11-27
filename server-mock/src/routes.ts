interface Route {
	login: string;
	createAccount: string;
	baseUrl: string;
	summary: string;
}

export const routes: Route = {
	login: "/api/login",
	createAccount: "/api/create-account",
	baseUrl: "/api/dashboard",
	summary: "/api/summary",
};