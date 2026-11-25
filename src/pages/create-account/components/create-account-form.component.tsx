import React from 'react';
import * as vm from '../create-account.vm';
import classes from './create-account-form.module.css';

interface Props {
	userCredentials: vm.UserCredentials;
	onCreateAccount: (event: React.FormEvent<HTMLFormElement>) => void;
	onUserChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CreateAccountForm: React.FC<Props> = ({ userCredentials, onCreateAccount, onUserChange }) => {
	return (
		<form onSubmit={onCreateAccount}>
			<input
				name="username"
				className={classes.user}
				type="text"
				autoComplete="username"
				placeholder="Username"
				value={userCredentials.username}
				onChange={onUserChange}
			/>
			<input
				name="password"
				className={classes.password}
				type="password"
				autoComplete="new-password"
				placeholder="Password"
				value={userCredentials.password}
				onChange={onUserChange}
			/>
			<input
				name="confirmPassword"
				className={classes.password}
				type="password"
				autoComplete="new-password"
				placeholder="Confirm Password"
				value={userCredentials.confirmPassword}
				onChange={onUserChange}
			/>
			<button className={classes.createAccountButton} type="submit">Create Account</button>
		</form>
	);
};