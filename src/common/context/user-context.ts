import React from 'react';

export interface User {
	id: number,
	name: string;
}

export interface UserContextProps {
	user: User,
	setUser: (user: User) => void;
}

export const getDefaultUser = (): User => {
	return {
		id: 0,
		name: ''
	}
}

export const UserContext = React.createContext<UserContextProps | null>({
	user: getDefaultUser(),
	setUser: () => { },
})

export const useUserContext = () => {
	const userContext = React.useContext(UserContext);

	return {
		user: userContext?.user ?? getDefaultUser(),
		setUser: userContext?.setUser ?? (() => { }),
	}
}