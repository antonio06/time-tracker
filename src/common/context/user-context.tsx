import React from 'react';

interface User {
	id: number,
	name: string;
}

interface UserContextProps {
	user: User,
	setUser: (user: User) => void;
}

const getDefaultUser = (): User => {
	return {
		id: 0,
		name: ''
	}
}

export const UserContext = React.createContext<UserContextProps | null>({
	user: getDefaultUser(),
	setUser: () => { },
})

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = React.useState<User>(getDefaultUser());

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUserContext = () => {
	const userContext = React.useContext(UserContext);

	return {
		user: userContext?.user ?? getDefaultUser(),
		setUser: userContext?.setUser ?? (() => { }),
	}
}