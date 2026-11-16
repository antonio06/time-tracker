import React from 'react';
import { LoginForm } from './component/login-form.component';
import * as vm from './login.vm';
import classes from './login.module.css';

export const LoginPage: React.FC = () => {
	const [user, setUser] = React.useState<vm.User>(vm.emptyUser);

	const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(user);
		// Add login logic here
	};

	return (
		<div className={classes.login}>
			<h1>Login</h1>
			<LoginForm user={user} onUserChange={handleUserChange} onSubmit={handleLogin} />
		</div>
	);
};