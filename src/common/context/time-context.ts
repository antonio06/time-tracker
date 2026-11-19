import React from 'react';

interface TimeContextProps {
	month: number;
	year: number;
	setMonth: (month: number) => void;
	setYear: (year: number) => void;
}

export const getDefaultMonth = () => import.meta.env.VITE_IS_MOCK === 'true' ? 11 : new Date().getMonth() + 1;
export const getDefaultYear = () => import.meta.env.VITE_IS_MOCK === 'true' ? 2026 : new Date().getFullYear();

export const TimeContext = React.createContext<TimeContextProps | null>({
	month: getDefaultMonth(),
	year: getDefaultYear(),
	setMonth: () => { },
	setYear: () => { }
});

export const useTimeContext = () => {
	const timeContext = React.useContext(TimeContext);

	return {
		month: timeContext?.month ?? getDefaultMonth(),
		year: timeContext?.year ?? getDefaultYear(),
		setMonth: timeContext?.setMonth ?? (() => { }),
		setYear: timeContext?.setYear ?? (() => { }),
	};
};