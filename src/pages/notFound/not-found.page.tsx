import React from 'react';
import styles from './not-found.module.css';

export const NotFoundPage: React.FC = () => {
	return (
		<div className={styles.notFound}>
			<h1 className={styles.error404}>404 - Page Not Found</h1>
		</div>
	);
};