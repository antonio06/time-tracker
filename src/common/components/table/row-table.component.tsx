import React from 'react';
import * as vm from '../../model';
import { getTotalWorkedHoursPerTask, getRoundPerTwoDigits } from './table-business';
import './row-table.css';

interface Props {
  track: vm.Dashboard;
  index: number;
  onInputValueNumberChange: (taskId: number, dateId: number, newValue: number) => void;
  onInputValueStringChange: (taskId: number, newValue: string) => void;
}

export const RowTable: React.FC<Props> = ({ track, onInputValueNumberChange, onInputValueStringChange }) => {

  const onchange = (wh: vm.WorkedHours, e: React.ChangeEvent<HTMLInputElement>) => {
    onInputValueNumberChange(wh.taskId, wh.dateId, Number(e.target.value));
  }

  return (
    <tr>
      <td className="cell">
        <input className="taskName" value={track.task} onChange={(e) => onInputValueStringChange(track.id, e.target.value)} />
      </td>
      {
        track.workedHours.map((wh, i) => (
          <td key={i} className="cell">
            <input key={i} value={wh.value} onChange={(e) => onchange(wh, e)} type="number" />
          </td>
        ))
      }
      <td className="cell">
        <input disabled value={getRoundPerTwoDigits(getTotalWorkedHoursPerTask(track.workedHours))} />
      </td>
    </tr>
  )
}
