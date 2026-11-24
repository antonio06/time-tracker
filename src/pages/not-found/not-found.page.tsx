import React from 'react';
import styles from './not-found.module.css';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
	return (
		<div className={styles.notFound}>
			<h1 className={styles.error404}>404 - Page Not Found</h1>
			<Link to="/" className={styles.goToHome}>Go back to Home</Link>
		</div>
	);
};