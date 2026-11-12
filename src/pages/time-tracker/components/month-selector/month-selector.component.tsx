import React from "react";
import { months } from "./moths";
import classes from "./month-selector.module.css";

interface Props {
	onMonthChange: (monthId: string) => void;
}

export const MonthSelector: React.FC<Props> = ({ onMonthChange }) => {
	const [selectedMonth, setSelectedMonth] = React.useState("");
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const montId = event.target.value;
		setSelectedMonth(montId);
		onMonthChange(montId);
	};

	return (
		<>
			<select className={classes.monthSelector} value={selectedMonth} onChange={handleChange}>
				<option value="">Select month</option>
				{
					months.map(month => (
						<option key={month.value} value={month.value}>
							{month.label}
						</option>
					))
				}
			</select>
		</>
	)
}