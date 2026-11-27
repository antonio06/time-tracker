import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./protected-router.component";
import { switchRoutes } from "./routes";
import { LoginScene, NotFoundScene, TimeTrackerScene, CreateAccountScene, YearlySummaryScene } from "@/scenes";
import { TimeProvider, UserProvider } from "@/common/context";

// TimeProvider wraps every route so the time tracker and the yearly summary share the same month and year
export const RouterComponent: React.FC = () => {
	return (
		<UserProvider>
			<TimeProvider>
				<Router>
					<Routes>
						<Route path={switchRoutes.root} element={<LoginScene />} />
						<Route path={switchRoutes.timeTracker} element={<ProtectedRoute><TimeTrackerScene /></ProtectedRoute>} />
						<Route path={switchRoutes.yearlySummary} element={<ProtectedRoute><YearlySummaryScene /></ProtectedRoute>} />
						<Route path={switchRoutes.createAccount} element={<CreateAccountScene />} />
						<Route path="*" element={<NotFoundScene />} />
					</Routes>
				</Router>
			</TimeProvider>
		</UserProvider>
	);
};
