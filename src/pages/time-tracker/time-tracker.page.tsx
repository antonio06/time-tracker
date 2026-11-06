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

  return (
    <TimeTable trackerList={trackerList} />
  );
};
