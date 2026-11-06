import React from 'react';
import * as vm from '../../model';
import './body-table.css';

interface Props {
  trackList: vm.Dashboard[];
  days: Date[];
}

export const BodyTable: React.FC<Props> = ({ trackList, days }) => {

  const getTotalWorkedHoursPerTask = (workedHours: vm.WorkedHours[]): number => {
    return workedHours.reduce((total, workHour) => {
      return workHour.value + total;
    }, 0)
  }

  const getTotalWorkedHoursPerDay = (dayId: number): number => {
    return trackList.reduce((total, track) => {
      const workHour = track.workedHours.find(wh => wh.dateId === dayId);
      return workHour ? total + workHour.value : total;
    }, 0)
  }

  const getTotalWorkedPerTotal = () => trackList.reduce((total, track) => total + getTotalWorkedHoursPerTask(track.workedHours), 0);

  const getRoundPerTwoDigits = (value: number) => value.toFixed(2);

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
            <td key={index} className="cell">{getRoundPerTwoDigits(getTotalWorkedHoursPerDay(index))}</td>
          ))
        }
        <td className="cell">{getRoundPerTwoDigits(getTotalWorkedPerTotal())}</td>
      </tr>
    </tbody>
  );
}
