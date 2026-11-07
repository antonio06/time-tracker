import React from 'react';
import { TimeTable } from '../../common/components'
import { AddTrackComponent } from './components/add-track-component';
import * as vm from '../../common/model';
import * as api from './api/api';
import { getMonthName } from '../../common/helpers';
import { mapToVm, createEmptyTrack } from './time-tracker.mapper';
import './time-tracker.css';

export const TimeTrackerPage: React.FC = () => {
  const [trackerList, setTrackerList] = React.useState<vm.Dashboard[]>([]);

  React.useEffect(() => {
    api.getTrackerList().then((result) => {
      const mappedData = mapToVm(result);
      setTrackerList(mappedData);
    });
  }, []);

  const handledInputValueNumberChange = (taskId: number, dateId: number, newValue: number) => {
    const updatedTrackerList = trackerList.map(track => {
      return taskId === track.id ? { ...track, workedHours: updateWorkedHours(track, dateId, newValue) } : { ...track }
    })

    setTrackerList([...updatedTrackerList]);
  }

  const updateWorkedHours = (track: vm.Dashboard, dateId: number, newValue: number): vm.WorkedHours[] => {
    const updateWorkedHours = track.workedHours.map((wh => {
      if (wh.dateId === dateId) {
        return { ...wh, value: newValue }
      } else {
        return { ...wh }
      }
    }))
    return updateWorkedHours
  }

  const handledInputValueStringChange = (taskId: number, newValue: string) => {
    const updatedTrackerList = trackerList.map(track => {
      return taskId === track.id ? { ...track, task: newValue } : { ...track }
    })

    setTrackerList([...updatedTrackerList]);
  }

  const addTask = () => {
    const newTask = {
      ...createEmptyTrack(trackerList.length, trackerList[0].workedHours.length),
    }
    setTrackerList([...trackerList, newTask]);
  }

  const month: number = 11;

  return (
    <div className="container ">
      <div className="header">
        <div>
          <h1 className="title">Monthly Timesheet</h1>
          <h2>{getMonthName(month)} {new Date().getFullYear()}</h2>
        </div>
        <AddTrackComponent onAddTask={addTask} />
      </div>
      <TimeTable trackerList={trackerList} onInputValueNumberChange={handledInputValueNumberChange} onInputValueStringChange={handledInputValueStringChange} />
    </div>
  );
};
