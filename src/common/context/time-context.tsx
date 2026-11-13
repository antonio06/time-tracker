import React from 'react';

interface TimeContextProps {
	month: number;
	year: number;
	setMonth: (month: number) => void;
	setYear: (year: number) => void;
}

const getDefaultMonth = () => import.meta.env.VITE_IS_MOCK === 'true' ? 11 : new Date().getMonth() + 1;
const getDefaultYear = () => import.meta.env.VITE_IS_MOCK === 'true' ? 2026 : new Date().getFullYear();

export const TimeContext = React.createContext<TimeContextProps | null>({
	month: getDefaultMonth(),
	year: getDefaultYear(),
	setMonth: () => { },
	setYear: () => { }
});

export const TimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [month, setMonth] = React.useState(getDefaultMonth());
	const [year, setYear] = React.useState(getDefaultYear());

	return (
		<TimeContext.Provider value={{ month, year, setMonth, setYear }}>
			{children}
		</TimeContext.Provider>
	);
};

export const useTimeContext = () => {
	const timeContext = React.useContext(TimeContext);
	
	return {
		month: timeContext?.month ?? getDefaultMonth(),
		year: timeContext?.year ?? getDefaultYear(),
		setMonth: timeContext?.setMonth ?? (() => { }),
		setYear: timeContext?.setYear ?? (() => { }),
	};
};