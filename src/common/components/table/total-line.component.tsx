import React from 'react';
import { getTotalWorkedHoursPerDay, getTotalWorkedPerTotal, getRoundPerTwoDigits } from './table-business';
import * as vm from '../../model';

interface Props {
  days: Date[];
  trackList: vm.Dashboard[];
}

export const TotalLine: React.FC<Props> = ({ days, trackList }) => {
  return (
    <tr>
      <td className="cell">Total de horas</td>
      {
        days.map((_, index) => (
          <td key={index} className="cell">{getRoundPerTwoDigits(getTotalWorkedHoursPerDay(index, trackList))}</td>
        ))
      }
      <td className="cell">{getRoundPerTwoDigits(getTotalWorkedPerTotal(trackList))}</td>
    </tr>
  )
}
