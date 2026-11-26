import React from 'react';
import * as vm from '@/common/model';
import { getTaskTotal, getLongDayLabel, isWeekend } from '@/common/helpers';
import { getRoundPerTwoDigits } from './table-business';
import trashIcon from '@/assets/trash.svg';
import { useTimeContext } from '@/common/context';
import classes from './row-table.module.css';

interface Props {
  track: vm.DashboardVm;
  index: number;
  daysInMonth: number;
  onInputValueNumberChange: (taskId: number, dateId: number, newValue: number) => void;
  onInputValueStringChange: (taskId: number, newValue: string) => void;
  onDeleteTask: (taskId: number) => void;
}

export const RowTable: React.FC<Props> = ({ track, daysInMonth, onInputValueNumberChange, onInputValueStringChange, onDeleteTask }) => {
  const { month, year } = useTimeContext();

  const handleInputChange = (wh: vm.WorkedHoursVm, e: React.ChangeEvent<HTMLInputElement>) => {
    onInputValueNumberChange(wh.taskId, wh.dateId, Number(e.target.value));
  }

  const handleDeleteTask = (taskId: number) => {
    onDeleteTask(taskId);
  }

  // dateId is 0-based (0 = 1st of the month) and month is 1-based
  const getDate = (dateId: number) => new Date(year, month - 1, dateId + 1);

  const taskName = track.task.trim() || 'untitled task';

  return (
    <tr>
      <td>
        <button className={classes.deleteButton} onClick={() => handleDeleteTask(track.id)}><img src={trashIcon} alt={`Delete ${taskName}`} /></button>
      </td>
      <td className={classes.cell}>

        <input
          name={`task-${track.id}-name`}
          aria-label="Task name"
          className={classes.taskName}
          value={track.task}
          onChange={(e) => onInputValueStringChange(track.id, e.target.value)}
        />
      </td>
      {
        track.workedHours.map((wh, i) => (
          <td key={i} className={classes.cell}>
            <input
              key={i}
              name={`task-${track.id}-day-${wh.dateId + 1}`}
              aria-label={`Hours for ${taskName} on ${getLongDayLabel(getDate(wh.dateId))}`}
              value={wh.value}
              onChange={(e) => handleInputChange(wh, e)}
              type="number"
              disabled={isWeekend(getDate(wh.dateId))}
            />
          </td>
        ))
      }
      <td className={classes.total}>
        {getRoundPerTwoDigits(getTaskTotal(track, daysInMonth))}
      </td>
    </tr>
  )
}
