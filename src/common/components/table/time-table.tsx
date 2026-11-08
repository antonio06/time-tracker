import React from 'react';
import { HeadTable } from './head-table.component';
import { BodyTable } from './body-table.component';
import { getDaysInMonth } from '../../helpers';
import * as vm from '../../model';
import './table.css';

interface Props {
  trackerList: vm.Dashboard[];
  onInputValueNumberChange: (taskId: number, dateId: number, newValue: number) => void;
  onInputValueStringChange: (taskId: number, newValue: string) => void;
  onDeleteTask: (taskId: number) => void;
}

export const TimeTable: React.FC<Props> = ({ trackerList, onInputValueNumberChange: onInputChange, onInputValueStringChange, onDeleteTask }) => {
  const month: number = 11;
  const year: number = new Date().getFullYear();
  const days = getDaysInMonth(month, year);


  return (
    <div className="table-wrapper">


      <table className="table">
        <HeadTable days={days} />
        <BodyTable trackList={trackerList} days={days} onInputValueNumberChange={onInputChange} onInputValueStringChange={onInputValueStringChange} onDeleteTask={onDeleteTask} />
      </table>
    </div>
  )
};
