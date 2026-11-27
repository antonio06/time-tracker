import React from 'react';
import { getRoundPerTwoDigits } from '@/common/components';
import * as vm from '@/pages/yearly-summary/yearly-summary.vm';
import classes from './summary-list.module.css';

interface Props {
  summary: vm.YearlySummaryVm;
}

export const SummaryList: React.FC<Props> = ({ summary }) => {
  return (
    <dl className={classes.summaryList}>
      <div className={classes.item}>
        <dt className={classes.label}>Total worked hours</dt>
        <dd className={classes.value}>{getRoundPerTwoDigits(summary.totalWorkHoursByYear)}</dd>
      </div>
      <div className={classes.item}>
        <dt className={classes.label}>Average hours per working day</dt>
        <dd className={classes.value}>{getRoundPerTwoDigits(summary.averageWorkHours)}</dd>
      </div>
    </dl>
  );
};
