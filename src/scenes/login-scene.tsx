import React from "react";
import { UserProvider } from '@/common/context';
import { AppLayout } from '@/layouts';
import { LoginPage } from '@/pages';

export const LoginScene: React.FC = () => {
	const isLoggedIn = false;
	return (
		<AppLayout isLoggedIn={isLoggedIn}>
			<LoginPage />
		</AppLayout>
	);
};