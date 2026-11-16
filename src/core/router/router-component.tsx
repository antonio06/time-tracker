import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { switchRoutes } from "./routes";
import { LoginScene } from "@/scenes/login-scene";
import { TimeTrackerScene } from "@/scenes/time-tracker.scene";
import { UserProvider } from "@/common/context";

export const RouterComponent: React.FC = () => {
	return (
		<UserProvider>
			<Router>
				<Routes>
					<Route path={switchRoutes.root} element={<LoginScene />} />
					<Route path={switchRoutes.timeTracker} element={<TimeTrackerScene />} />
				</Routes>
			</Router>
		</UserProvider>
	);
};