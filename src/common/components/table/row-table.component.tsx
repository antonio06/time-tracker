import React from 'react';
import * as vm from '@/common/model';
import { getTaskHoursByDay, getTaskTotal, getLongDayLabel, isWeekend } from '@/common/helpers';
import { getRoundPerTwoDigits } from './table-business';
import trashIcon from '@/assets/trash.svg';
import classes from './row-table.module.css';

interface Props {
  track: vm.DashboardVm;
  index: number;
  days: Date[];
  onInputValueNumberChange: (taskId: number, dateId: number, newValue: number) => void;
  onInputValueStringChange: (taskId: number, newValue: string) => void;
  onDeleteTask: (taskId: number) => void;
}

export const RowTable: React.FC<Props> = ({ track, days, onInputValueNumberChange, onInputValueStringChange, onDeleteTask }) => {
  const handleDeleteTask = (taskId: number) => {
    onDeleteTask(taskId);
  }

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
        // One cell per day of the month, the same days as the header. dateId is 0-based (0 = 1st of the month)
        days.map((date, dateId) => (
          <td key={dateId} className={classes.cell}>
            <input
              name={`task-${track.id}-day-${dateId + 1}`}
              aria-label={`Hours for ${taskName} on ${getLongDayLabel(date)}`}
              value={getTaskHoursByDay(track, dateId)}
              onChange={(e) => onInputValueNumberChange(track.id, dateId, Number(e.target.value))}
              type="number"
              disabled={isWeekend(date)}
            />
          </td>
        ))
      }
      <td className={classes.total}>
        {getRoundPerTwoDigits(getTaskTotal(track, days.length))}
      </td>
    </tr>
  )
}
