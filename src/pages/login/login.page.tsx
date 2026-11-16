import React from 'react';
import classes from './login.module.css';

export const LoginPage: React.FC = () => {
	return (
		<div className={classes.login}>
			<h1>Login</h1>
			<form>
				<input name="username" className={classes.user} type="text" placeholder="Username" />
				<input name="password" className={classes.password} type="password" placeholder="Password" />
				<button className={classes.loginButton} type="submit">Login</button>
			</form>
		</div>
	);
};