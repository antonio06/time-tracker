import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginForm } from './component/login-form.component';
import * as vm from './login.vm';
import { login } from './api/api';
import { mapUserToUserCredencials } from './login.mappers';
import { Alert, useHideMessage } from '@/common/components/alert';
import { useUserContext } from '@/common/context/user-context';
import { switchRoutes } from '@/core/router';
import classes from './login.module.css';

export const LoginPage: React.FC = () => {
	const [userCredentials, setUserCredentials] = React.useState<vm.User>(vm.emptyUser);
	const { setUser } = useUserContext();
	const { message, isSuccess, isVisible, hideAlert } = useHideMessage();
	const navigate = useNavigate();

	const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserCredentials({ ...userCredentials, [name]: value });
	};

	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const modelCredentials = mapUserToUserCredencials(userCredentials);
		// Add login logic here
		login(modelCredentials).then((success) => {
			if (success) {
				navigate('/time-tracker');
				setUser({ id: 0, name: userCredentials.username });
			} else {
				hideAlert('Wrong credentials', false, true);
			}
		}).catch((error) => {
			hideAlert(`An error occurred: ${error.message}`, false, true);
		});
	};

	return (
		<>
			<div className={classes.login}>
				<h1>Login</h1>
				<LoginForm user={userCredentials} onUserChange={handleUserChange} onSubmit={handleLogin} />
				<Link to={switchRoutes.createAccount} className={classes.createAccountLink}>Create Account</Link>
			</div>
			<Alert message={message} isSuccess={isSuccess} isVisible={isVisible} />
		</>
	);
};