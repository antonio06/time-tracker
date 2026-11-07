import React from 'react';
import * as vm from '../../model';
import { RowTable } from './row-table.component';
import { TotalLine } from './total-line.component';
import './body-table.css';

interface Props {
  trackList: vm.Dashboard[];
  days: Date[];
  onInputChange: (taskId: number, dateId: number, newValue: number) => void;
}

export const BodyTable: React.FC<Props> = ({ trackList, days, onInputChange }) => {
  return (
    <tbody>
      {
        trackList.map((track, id) => {
          return <RowTable key={id} track={track} index={id} onInputChange={onInputChange} />
        })
      }
      <TotalLine days={days} trackList={trackList} />
    </tbody>
  );
}
