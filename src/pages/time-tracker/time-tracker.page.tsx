import React from 'react';
import { TimeTable } from '../../common/components'
import * as vm from '../../common/model';
import * as api from './api/api';
import { mapToVm } from './time-tracker.mapper';

export const TimeTrackerPage: React.FC = () => {
  const [trackerList, setTrackerList] = React.useState<vm.Dashboard[]>([]);

  React.useEffect(() => {
    api.getTrackerList().then((result) => {
      const mappedData = mapToVm(result);
      setTrackerList(mappedData);
    });
  }, []);

  const handledInputChange = (taskId: number, dateId: number, newValue: number) => {
    console.log(taskId, dateId, newValue)
    const updatedTrackerList = trackerList.map(track => {
      if (taskId === track.id) {
        const updateWorkedHours = track.workedHours.map((wh => {
          if (wh.dateId === dateId) {
            return { ...wh, value: newValue }
          } else {
            return { ...wh }
          }
        }))
        return { ...track, workedHours: updateWorkedHours }
      } else {
        return { ...track }
      }
    })

    // Update the trackerList with the new values
    // This line depends on how you manage state, e.g., using useState
    setTrackerList([...updatedTrackerList]);
  }

  return (
    <TimeTable trackerList={trackerList} onInputChange={handledInputChange} />
  );
};
