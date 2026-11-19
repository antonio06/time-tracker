import React from 'react';
import { TimeContext, getDefaultMonth, getDefaultYear } from './time-context';

export const TimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [month, setMonth] = React.useState(getDefaultMonth());
	const [year, setYear] = React.useState(getDefaultYear());

	return (
		<TimeContext.Provider value={{ month, year, setMonth, setYear }}>
			{children}
		</TimeContext.Provider>
	);
};