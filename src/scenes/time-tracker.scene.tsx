import React from "react";
import { TimeTrackerPage } from '@/pages';
import { TimeProvider, UserProvider } from '@/common/context';
import { AppLayout } from '@/layouts';

export const TimeTrackerScene: React.FC = () => {
	const isLoggedIn = false; // Replace with actual login state
	return (<AppLayout isLoggedIn={isLoggedIn}>
		<UserProvider>
			<TimeProvider>
				<TimeTrackerPage />
			</TimeProvider>
		</UserProvider>
	</AppLayout>)
};