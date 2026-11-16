import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '@/common/context';

interface ProtectedRouteProps {
	element: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
	const { user } = useUserContext();

	if (!user.name) {
		return <Navigate to="/" replace />;
	}

	return element;
};
