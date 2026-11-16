interface SwitchRoutes {
	root: string;
	timeTracker: string;
}

export const switchRoutes: SwitchRoutes = {
	root: "/",
	timeTracker: "/time-tracker",
};

export const routes: SwitchRoutes = {
	...switchRoutes,
};