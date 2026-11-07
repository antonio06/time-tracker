import React from 'react';
import * as vm from '../../model';
import { getTotalWorkedHoursPerTask, getRoundPerTwoDigits } from './table-business';
import './row-table.css';

interface Props {
  track: vm.Dashboard;
  index: number;
  onInputChange: (taskId: number, dateId: number, newValue: number) => void;
}

export const RowTable: React.FC<Props> = ({ track, onInputChange }) => {

  const onchange = (wh: vm.WorkedHours, e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(wh.taskId, wh.dateId, Number(e.target.value));
  }

  return (
    <tr>
      <td className="cell">{track.task}</td>
      {
        track.workedHours.map((wh, i) => (
          <td key={i} className="cell">
            <input key={i} value={wh.value} onChange={(e) => onchange(wh, e)} type="number" />
          </td>
        ))
      }
      <td className="cell">{getRoundPerTwoDigits(getTotalWorkedHoursPerTask(track.workedHours))}</td>
    </tr>
  )
}
