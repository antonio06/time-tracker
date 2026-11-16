import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context';
import classes from './header.module.css';
import userIcon from '@/assets/user.svg';
import logoutIcon from '@/assets/logout.svg';

export const Header: React.FC = () => {
	const userContext = useUserContext();

	const navigate = useNavigate();
	const logout = () => {
		userContext.setUser({ id: 0, name: '' });
		navigate('/');
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