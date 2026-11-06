import React from 'react';
import * as vm from '../../model';
import './body-table.css';
import { getTotalWorkedHoursPerTask, getTotalWorkedHoursPerDay, getTotalWorkedPerTotal, getRoundPerTwoDigits } from './table-business';

interface Props {
  trackList: vm.Dashboard[];
  days: Date[];
}

export const BodyTable: React.FC<Props> = ({ trackList, days }) => {
  return (
    <tbody>
      {
        trackList.map((track, id) => {
          return (
            <tr key={id}>
              <td key={id} className="cell">{track.task}</td>
              {
                track.workedHours.map((wh, index) => (
                  <td key={index} className="cell">{getRoundPerTwoDigits(wh.value)}</td>
                ))
              }
              <td key={id} className="cell">{getRoundPerTwoDigits(getTotalWorkedHoursPerTask(track.workedHours))}</td>
            </tr>
          )
        })
      }
      <tr>
        <td className="cell">Total de horas</td>
        {
          days.map((_, index) => (
            <td key={index} className="cell">{getRoundPerTwoDigits(getTotalWorkedHoursPerDay(index, trackList))}</td>
          ))
        }
        <td className="cell">{getRoundPerTwoDigits(getTotalWorkedPerTotal(trackList))}</td>
      </tr>
    </tbody>
  );
}
