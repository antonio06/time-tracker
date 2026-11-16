import React from "react";
import { AppLayout } from '@/layouts';
import { NotFoundPage } from '@/pages';

export const NotFoundScene: React.FC = () => {
	const isLoggedIn = false;
	return (
		<AppLayout isLoggedIn={isLoggedIn}>
			<NotFoundPage />
		</AppLayout>
	);
};