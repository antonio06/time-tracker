import React from 'react';
import { UnsavedChangesContext } from './unsaved-changes-context';

export const UnsavedChangesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isDirty, setIsDirty] = React.useState(false);

	React.useEffect(() => {
		if (!isDirty) return;
		const handler = (e: BeforeUnloadEvent) => e.preventDefault();
		window.addEventListener('beforeunload', handler);
		return () => window.removeEventListener('beforeunload', handler);
	}, [isDirty]);

	return (
		<UnsavedChangesContext.Provider value={{ isDirty, setIsDirty }}>
			{children}
		</UnsavedChangesContext.Provider>
	);
};
