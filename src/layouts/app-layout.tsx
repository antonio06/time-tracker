import React from 'react';
import { Header, Footer } from '../common/components';
import classes from './app-layout.module.css';

interface Props {
	children: React.ReactNode;
	isLoggedIn: boolean;
}

export const AppLayout: React.FC<Props> = ({ children, isLoggedIn }) => {
	return (
		<div className={classes.appLayout}>
			{!isLoggedIn && <Header />}
			<main className={classes.content}>
				{children}
			</main>
			<Footer />
		</div>
	);
};