import React from 'react';
import * as vm from '../../model';
import { getTotalWorkedHoursPerTask, getRoundPerTwoDigits } from './table-business';
import trashIcon from '../../../assets/trash.png';
import classes from './row-table.module.css';

interface Props {
  track: vm.DashboardVm;
  index: number;
  onInputValueNumberChange: (taskId: number, dateId: number, newValue: number) => void;
  onInputValueStringChange: (taskId: number, newValue: string) => void;
  onDeleteTask: (taskId: number) => void;
}

export const RowTable: React.FC<Props> = ({ track, onInputValueNumberChange, onInputValueStringChange, onDeleteTask }) => {

  const handleInputChange = (wh: vm.WorkedHoursVm, e: React.ChangeEvent<HTMLInputElement>) => {
    onInputValueNumberChange(wh.taskId, wh.dateId, Number(e.target.value));
  }

  const handleDeleteTask = (taskId: number) => {
    onDeleteTask(taskId);
  }

  const getNameDay = (dateId: number) => {
    const year = import.meta.env.VITE_IS_MOCK === 'true' ? 2026 : new Date().getFullYear();
    const month = import.meta.env.VITE_IS_MOCK === 'true' ? 10 : new Date().getMonth();
    const currentDay = new Date(year, month, dateId + 1);
    return currentDay.toLocaleDateString('en-US', { weekday: 'short' });
  }

  return (
    <tr>
      <td>
        <button className={classes.deleteButton} onClick={() => handleDeleteTask(track.id)}><img src={trashIcon} alt="icon" /></button>
      </td>
      <td className={classes.cell}>

        <input className={classes.taskName} value={track.task} onChange={(e) => onInputValueStringChange(track.id, e.target.value)} />
      </td>
      {
        track.workedHours.map((wh, i) => (
          <td key={i} className={classes.cell}>
            <input key={i} value={wh.value} onChange={(e) => handleInputChange(wh, e)} type="number" disabled={getNameDay(wh.dateId) === 'Sat' || getNameDay(wh.dateId) === 'Sun'} />
          </td>
        ))
      }
      <td className={classes.total}>
        {getRoundPerTwoDigits(getTotalWorkedHoursPerTask(track.workedHours))}
      </td>
    </tr>
  )
}
