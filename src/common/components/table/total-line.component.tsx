import React from 'react';
import { getTotalWorkedHoursPerDay, getTotalWorkedPerTotal, getRoundPerTwoDigits } from './table-business';
import * as vm from '@/common/model';
import classes from './total-line.module.css';

interface Props {
  days: Date[];
  trackList: vm.DashboardVm[];
}

export const TotalLine: React.FC<Props> = ({ days, trackList }) => {
  return (
    <tr>
      <td className={classes.cell}>Total</td>
      <td className={classes.cell}></td>
      {
        days.map((_, index) => (
          <td key={index} className={classes.cell}>
            <span className={classes.dayTotal}>{getRoundPerTwoDigits(getTotalWorkedHoursPerDay(index, trackList))}</span>
          </td>
        ))
      }
      <td className={classes.total}>
        {getRoundPerTwoDigits(getTotalWorkedPerTotal(trackList))}
      </td>
    </tr>
  )
}
