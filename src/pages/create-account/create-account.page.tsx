import React from 'react';
import { CreateAccountForm } from './component/create-account-form.component';
import { validateUserCredentials } from './create-account.validations';
import { Alert, useHideMessage } from '@/common/components/alert';
import * as vm from './create-account.vm';
import { mapUserToUserCredentials } from './create-account.mapper';
import { createAccount } from './api';
import classes from './create-account.module.css';

export const CreateAccountPage: React.FC = () => {
	const [userCredentials, setUserCredentials] = React.useState<vm.UserCredentials>(vm.createAccountInitialValues);
	const { message, isSuccess, isVisible, hideAlert } = useHideMessage();

	const handleCreateAccount = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const errors = validateUserCredentials(userCredentials);
		if (Object.keys(errors).length > 0) {
			hideAlert('Please fix the errors', false, true);
		} else {
			const userCredentialsMapped = mapUserToUserCredentials(userCredentials);
			createAccount(userCredentialsMapped)
				.then((result) => {
					hideAlert('Account created successfully', true, true);
				})
				.catch((error) => {
					hideAlert(`Failed to create account: ${error.message}`, false, true);
				});
		}
	};

	const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setUserCredentials((prev) => ({
			...prev,
			[name]: value
		}));
	};

	return (
		<>
			<div className={classes.createAccount}>
				<h1>Create Account</h1>
				<CreateAccountForm userCredentials={userCredentials} onCreateAccount={handleCreateAccount} onUserChange={handleUserChange} />
			</div>
			<Alert message={message} isSuccess={isSuccess} isVisible={isVisible} />
		</>
	);
};