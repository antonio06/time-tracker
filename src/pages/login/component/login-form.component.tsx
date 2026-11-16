import React from 'react';
import * as vm from '../login.vm';
import classes from './login-form.module.css';

interface Props {
	user: vm.User;
	onUserChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const LoginForm: React.FC<Props> = ({ user, onUserChange, onSubmit }) => {
	return (
		<form className={classes.form} onSubmit={onSubmit}>
			<input
				name="username"
				className={classes.user}
				type="text"
				placeholder="Username"
				value={user.username}
				onChange={onUserChange}
			/>
			<input
				name="password"
				className={classes.password}
				type="password"
				placeholder="Password"
				value={user.password}
				onChange={onUserChange}
			/>
			<button className={classes.loginButton} type="submit">Login</button>
		</form>
	);
};