import React from 'react';
import { getShortDayLabel } from '@/common/helpers';
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
          days.map((d, id) => <th key={id} className={classes.head}>{getShortDayLabel(d)}</th>)
        }
        <th className={classes.head}>Total</th>
      </tr>
    </thead>
  )
}
