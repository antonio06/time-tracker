import React from "react";
import { AppLayout } from '@/layouts';

export const LoginScene: React.FC = () => {
	const isLoggedIn = true; // Replace with actual login state
	return (
		<AppLayout isLoggedIn={isLoggedIn}>
			<div>Login Scene</div>
		</AppLayout>
	);
};