import React from 'react';
import classes from './head-table.module.css';

interface Props {
  days: Date[];
}

export const HeadTable: React.FC<Props> = ({ days }) => {
  return (
    <thead>
      <tr>
        <th className={classes.head}></th>
        <th className={classes.head}>Task</th>
        {
          days.map((d, id) => {
            const day = new Date(d).getDate();
            const dayOfWeek = new Date(d).toLocaleDateString('en-US', { weekday: 'short' });
            return <th key={id} className={classes.head}>{day} {dayOfWeek}</th>;
          })
        }
        <th className={classes.head}>Total</th>
      </tr>
    </thead>
  )
}
