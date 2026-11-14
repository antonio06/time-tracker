import React from 'react';
import classes from './header.module.css';
import userIcon from '../../../assets/user.svg';
import logoutIcon from '../../../assets/logout.svg';

export const Header: React.FC = () => {
	return (
		<div className={classes.header}>
			<div className={classes.user}>
				<img src={userIcon} alt="User Icon" className={classes.icon} />
				<p>User1</p>
			</div>
			<img src={logoutIcon} alt="Logout Icon" className={classes.icon} />
		</div>
	);
};