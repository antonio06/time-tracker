import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext, useUnsavedChangesContext } from '@/common/context';
import classes from './header.module.css';
import userIcon from '@/assets/user.svg';
import logoutIcon from '@/assets/logout.svg';
import { switchRoutes } from '@/core/router';

export const Header: React.FC = () => {
	const userContext = useUserContext();
	const { isDirty, setIsDirty } = useUnsavedChangesContext();

	const navigate = useNavigate();
	const logout = () => {
		if (isDirty && !window.confirm('You have unsaved changes. Do you want to log out anyway?')) {
			return;
		}
		setIsDirty(false);
		userContext.setUser({ id: 0, name: '' });
		navigate(switchRoutes.root);
	}
	return (
		<div className={classes.header}>
			<div className={classes.user}>
				<img src={userIcon} alt="User Icon" className={classes.icon} />
				<p>{userContext.user.name}</p>
			</div>
			<img className={`${classes.logoutIcon} ${classes.icon}`} onClick={() => logout()} src={logoutIcon} alt="Logout Icon" />
		</div>
	);
};