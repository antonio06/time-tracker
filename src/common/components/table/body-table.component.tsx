import React from 'react';
import * as vm from '../../model';
import { RowTable } from './row-table.component';
import { TotalLine } from './total-line.component';

interface Props {
  trackList: vm.Dashboard[];
  days: Date[];
  onInputValueNumberChange: (taskId: number, dateId: number, newValue: number) => void;
  onInputValueStringChange: (taskId: number, newValue: string) => void;
  onDeleteTask: (taskId: number) => void;
}

export const BodyTable: React.FC<Props> = ({ trackList, days, onInputValueNumberChange, onInputValueStringChange, onDeleteTask }) => {
  return (
    <tbody>
      {
        trackList.map((track, id) => {
          return <RowTable key={id} track={track} index={id} onInputValueNumberChange={onInputValueNumberChange} onInputValueStringChange={onInputValueStringChange} onDeleteTask={onDeleteTask} />
        })
      }
      <TotalLine days={days} trackList={trackList} />
    </tbody>
  );
}
