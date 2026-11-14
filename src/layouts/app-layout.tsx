import React from 'react';
import { Header, Footer } from '../common/components';
import classes from './app-layout.module.css';

interface Props {
	children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
	return (
		<div className={classes.appLayout}>
			<Header />
			{children}
			<Footer />
		</div>
	);
};

export default AppLayout;