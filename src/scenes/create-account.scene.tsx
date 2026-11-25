import React from 'react';
import { CreateAccountPage } from '@/pages';
import { AppLayout } from '@/layouts';

export const CreateAccountScene: React.FC = () => {
	const isLoggedIn = false;

	return (
		<AppLayout isLoggedIn={isLoggedIn}>
			<CreateAccountPage />
		</AppLayout>
	);
};