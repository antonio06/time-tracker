import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./protected-router.component";
import { switchRoutes } from "./routes";
import { LoginScene, NotFoundScene, TimeTrackerScene, CreateAccountScene } from "@/scenes";
import { UserProvider } from "@/common/context";

export const RouterComponent: React.FC = () => {
	return (
		<UserProvider>
			<Router>
				<Routes>
					<Route path={switchRoutes.root} element={<LoginScene />} />
					<Route path={switchRoutes.timeTracker} element={<ProtectedRoute><TimeTrackerScene /></ProtectedRoute>} />
					<Route path={switchRoutes.createAccount} element={<CreateAccountScene />} />
					<Route path="*" element={<NotFoundScene />} />
				</Routes>
			</Router>
		</UserProvider>
	);
};