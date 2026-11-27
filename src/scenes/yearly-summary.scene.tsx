import React from "react";
import { YearlySummaryPage } from '@/pages';
import { AppLayout } from '@/layouts';

// The year comes from the TimeProvider in RouterComponent
export const YearlySummaryScene: React.FC = () => {
	const isLoggedIn = true;
	return (
		<AppLayout isLoggedIn={isLoggedIn}>
			<YearlySummaryPage />
		</AppLayout>
	);
};
