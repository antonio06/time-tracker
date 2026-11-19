import { createContext, useContext } from 'react';

interface UnsavedChangesContextProps {
	isDirty: boolean;
	setIsDirty: (isDirty: boolean) => void;
}

export const UnsavedChangesContext = createContext<UnsavedChangesContextProps | null>(null);

export const useUnsavedChangesContext = () => {
	const context = useContext(UnsavedChangesContext);
	return {
		isDirty: context?.isDirty ?? false,
		setIsDirty: context?.setIsDirty ?? (() => { }),
	};
};