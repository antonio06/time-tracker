import React from "react";
import { AppLayout } from '@/layouts';
import { LoginPage } from '@/pages';

export const LoginScene: React.FC = () => {
	const isLoggedIn = true; // Replace with actual login state
	return (
		<AppLayout isLoggedIn={isLoggedIn}>
			<LoginPage />
		</AppLayout>
	);
};