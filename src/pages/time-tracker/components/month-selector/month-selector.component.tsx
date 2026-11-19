import React from "react";
import { months } from "./months";
import { useTimeContext } from "@/common/context";
import classes from "./month-selector.module.css";

interface Props {
	onMonthChange: (newMonth: number) => void;
}

export const MonthSelector: React.FC<Props> = ({ onMonthChange }) => {
	const { month } = useTimeContext();

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const monthId = event.target.value;
		if (monthId) {
			const monthNum = Number(monthId);
			onMonthChange(monthNum);
		}
	};

	return (
		<>
			<select className={classes.monthSelector} value={String(month)} onChange={handleChange}>
				<option value="">Select month</option>
				{
					months.map(m => (
						<option key={m.value} value={String(m.value)}>
							{m.label}
						</option>
					))
				}
			</select>
		</>
	)
}