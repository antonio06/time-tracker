import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, useHideMessage } from '@/common/components/alert';
import { useTimeContext, useUserContext } from '@/common/context';
import { switchRoutes } from '@/core/router';
import { SummaryList } from './components';
import * as vm from './yearly-summary.vm';
import * as api from './api';
import { mapTaskListToVm } from './yearly-summary.mapper';
import { getYearlySummary } from './yearly-summary.business';
import classes from './yearly-summary.module.css';

export const YearlySummaryPage: React.FC = () => {
  const [summary, setSummary] = React.useState<vm.YearlySummaryVm>(vm.emptyYearlySummary);
  const { message, isSuccess, isVisible, hideAlert } = useHideMessage();
  const { year } = useTimeContext();
  const { user } = useUserContext();

  React.useEffect(() => {
    api.getYearTaskList(year, user.id).then((result) => {
      const trackerList = mapTaskListToVm(result);
      setSummary(getYearlySummary(trackerList, year));
    }).catch((error) => {
      hideAlert(`Error loading yearly summary: ${error}`, false, true);
    });
  }, [year, user.id, hideAlert]);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Yearly Summary</h1>
      <h2>{year}</h2>
      <SummaryList summary={summary} />
      <Link to={switchRoutes.timeTracker} className={classes.backLink}>Back to Monthly Timesheet</Link>

      <Alert message={message} isSuccess={isSuccess} isVisible={isVisible} />
    </div>
  );
};
