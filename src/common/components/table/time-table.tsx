import React from 'react';
import { HeadTable } from './head-table.component';
import { BodyTable } from './body-table.component';
import { getDaysInMonth, getMonthName } from '../../helpers';
import * as vm from '../../model';
import './table.css';

interface Props {
  trackerList: vm.Dashboard[];
  onInputChange: (taskId: number, dateId: number, newValue: number) => void;
}

export const TimeTable: React.FC<Props> = ({ trackerList, onInputChange }) => {
  const month: number = 11;
  const year: number = new Date().getFullYear();
  const days = getDaysInMonth(month, year);


  return (
    <div className="container">
      <h1 className="title">Track list for {getMonthName(month)}</h1>

      <table className="table">
        <HeadTable days={days} />
        <BodyTable trackList={trackerList} days={days} onInputChange={onInputChange} />
      </table>
    </div>
  )
};
