import React from 'react';
import { getTotalWorkedHoursPerDay, getTotalWorkedPerTotal, getRoundPerTwoDigits } from './table-business';
import * as vm from '../../model';
import './total-line.css';

interface Props {
  days: Date[];
  trackList: vm.Dashboard[];
}

export const TotalLine: React.FC<Props> = ({ days, trackList }) => {
  return (
    <tr>
      <td className="cell">Total</td>
      {
        days.map((_, index) => (
          <td key={index} className="cell">
            <input disabled value={getRoundPerTwoDigits(getTotalWorkedHoursPerDay(index, trackList))} />
          </td>
        ))
      }
      <td className="cell">
        <input disabled value={getRoundPerTwoDigits(getTotalWorkedPerTotal(trackList))} />
      </td>
    </tr>
  )
}
