import React from "react";
import { Navigate } from "react-router-dom";
import { switchRoutes } from "./routes";
import { useUserContext } from "@/common/context";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { user } = useUserContext();
	if (!user || user.name === '') {
		return <Navigate to={switchRoutes.root} />;
	}
	return <>{children}</>;
};