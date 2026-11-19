import React from "react";
import { TimeTrackerPage } from '@/pages';
import { TimeProvider, UnsavedChangesProvider } from '@/common/context';
import { AppLayout } from '@/layouts';

export const TimeTrackerScene: React.FC = () => {
	const isLoggedIn = true;
	return (<UnsavedChangesProvider>
		<AppLayout isLoggedIn={isLoggedIn}>
			<TimeProvider>
				<TimeTrackerPage />
			</TimeProvider>
		</AppLayout>
	</UnsavedChangesProvider>)
};