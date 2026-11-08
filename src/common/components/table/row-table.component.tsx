import React from 'react';
import * as vm from '../../model';
import { getTotalWorkedHoursPerTask, getRoundPerTwoDigits } from './table-business';
import trashIcon from '../../../assets/trash.png';
import classes from './row-table.module.css';

interface Props {
  track: vm.Dashboard;
  index: number;
  onInputValueNumberChange: (taskId: number, dateId: number, newValue: number) => void;
  onInputValueStringChange: (taskId: number, newValue: string) => void;
  onDeleteTask: (taskId: number) => void;
}

export const RowTable: React.FC<Props> = ({ track, onInputValueNumberChange, onInputValueStringChange, onDeleteTask }) => {

  const onchange = (wh: vm.WorkedHours, e: React.ChangeEvent<HTMLInputElement>) => {
    onInputValueNumberChange(wh.taskId, wh.dateId, Number(e.target.value));
  }

  const onClick = (taskId: number) => {
    onDeleteTask(taskId);
  }

  return (
    <tr>
      <td>
        <button className={classes.deleteButton} onClick={() => onClick(track.id)}><img src={trashIcon} alt="icon" /></button>
      </td>
      <td className={classes.cell}>

        <input className={classes.taskName} value={track.task} onChange={(e) => onInputValueStringChange(track.id, e.target.value)} />
      </td>
      {
        track.workedHours.map((wh, i) => (
          <td key={i} className={classes.cell}>
            <input key={i} value={wh.value} onChange={(e) => onchange(wh, e)} type="number" />
          </td>
        ))
      }
      <td className={classes.total}>
        {getRoundPerTwoDigits(getTotalWorkedHoursPerTask(track.workedHours))}
      </td>
    </tr>
  )
}
