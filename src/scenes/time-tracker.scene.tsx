import React from "react";
import { TimeTrackerPage } from '@/pages';
import { UnsavedChangesProvider } from '@/common/context';
import { AppLayout } from '@/layouts';

// TimeProvider is in RouterComponent, shared with the yearly summary.
// UnsavedChangesProvider stays here, so isDirty is reset when leaving the page, like its local state
export const TimeTrackerScene: React.FC = () => {
	const isLoggedIn = true;
	return (<UnsavedChangesProvider>
		<AppLayout isLoggedIn={isLoggedIn}>
			<TimeTrackerPage />
		</AppLayout>
	</UnsavedChangesProvider>)
};
