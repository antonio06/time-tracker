interface SwitchRoutes {
	root: string;
	timeTracker: string;
	createAccount: string;
}

export const switchRoutes: SwitchRoutes = {
	root: "/",
	timeTracker: "/time-tracker",
	createAccount: "/create-account",
};

export const routes: SwitchRoutes = {
	...switchRoutes,
};