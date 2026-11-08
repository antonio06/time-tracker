import React from 'react';
import { getTotalWorkedHoursPerDay, getTotalWorkedPerTotal, getRoundPerTwoDigits } from './table-business';
import * as vm from '../../model';
import classes from './total-line.module.css';

interface Props {
  days: Date[];
  trackList: vm.Dashboard[];
}

export const TotalLine: React.FC<Props> = ({ days, trackList }) => {
  return (
    <tr>
      <td className={classes.cell}>Total</td>
      <td className={classes.cell}></td>
      {
        days.map((_, index) => (
          <td key={index} className={classes.cell}>
            <input disabled value={getRoundPerTwoDigits(getTotalWorkedHoursPerDay(index, trackList))} />
          </td>
        ))
      }
      <td className={classes.total}>
        {getRoundPerTwoDigits(getTotalWorkedPerTotal(trackList))}
      </td>
    </tr>
  )
}
