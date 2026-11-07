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

  const handledInputChange = (taskId: number, dateId: number, newValue: number) => {
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

  const addTrack = (taskName: string) => {
    const newTrack = {
      ...createEmptyTrack(trackerList.length, trackerList[0].workedHours.length),
      task: taskName
    }
    setTrackerList([...trackerList, newTrack]);
  }

  const month: number = 11;

  return (
    <>
      <div className="header">
        <h1 className="title">Track list for {getMonthName(month)}</h1>
        <AddTrackComponent onAddTrack={addTrack} />
      </div>
      <TimeTable trackerList={trackerList} onInputChange={handledInputChange} />
    </>
  );
};
