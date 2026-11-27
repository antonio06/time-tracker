import React from 'react';
import { TimeTable } from '@/common/components'
import { ActionsComponent, MonthSelector } from './components';
import { Alert, useHideMessage } from '@/common/components/alert';
import * as vm from '@/common/model';
import * as api from './api';
import { getMonthName } from '@/common/helpers';
import { mapToVm, createEmptyTrack, mapToModel } from './time-tracker.mapper';
import { exportTimesheetToExcel } from './time-tracker.excel';
import { updateTaskHoursByDay } from './time-tracker.business';
import { getDaysInMonth } from '@/common/helpers';
import { useTimeContext, useUserContext, useUnsavedChangesContext } from '@/common/context';
import classes from './time-tracker.module.css';

export const TimeTrackerPage: React.FC = () => {
  const [trackerList, setTrackerList] = React.useState<vm.DashboardVm[]>([]);
  const { message, isSuccess, isVisible, hideAlert } = useHideMessage();
  const { month, year, setMonth } = useTimeContext();
  const { user } = useUserContext();
  const { isDirty, setIsDirty } = useUnsavedChangesContext();

  const loadedTrackerList = React.useCallback(() => {
    api.getTrackerList(month, year, user.id).then((result) => {
      if (result) {
        const mappedData = mapToVm(result);
        setTrackerList(mappedData);
      } else {
        hideAlert('Failed to load tracker list', false, true);
      }
    }).catch((error) => {
      hideAlert(`Error loading tracker list: ${error}`, false, true);
    });
  }, [month, year, user.id, hideAlert]);

  const handledInputValueNumberChange = (taskId: number, dateId: number, newValue: number) => {
    const updatedTrackerList = trackerList.map(track => {
      return taskId === track.id ? updateTaskHoursByDay(track, dateId, newValue) : { ...track }
    })

    setTrackerList([...updatedTrackerList]);
    setIsDirty(true);
  }

  const handleMonthChange = (newMonth: number) => {
    if (isDirty) {
      hideAlert('You have unsaved changes. Please save before changing the month.', false, true);
      return;
    }
    setMonth(newMonth);
  };

  const handledInputValueStringChange = (taskId: number, newValue: string) => {
    const updatedTrackerList = trackerList.map(track => {
      return taskId === track.id ? { ...track, task: newValue } : { ...track }
    })

    setTrackerList([...updatedTrackerList]);
    setIsDirty(true);
  }

  const addTask = () => {
    const newTask = createEmptyTrack(getDaysInMonth(month, year).length, month, year);
    setTrackerList(prev => [...prev, newTask]);
    setIsDirty(true);
  }

  const saveDashboard = () => {
    const dashboardModel = mapToModel(trackerList);
    api.saveDashboard(user.id, month, year, dashboardModel).then((isSaved) => {
      if (isSaved) {
        setIsDirty(false);
        hideAlert('Dashboard saved successfully', true, true);
        loadedTrackerList();
      } else {
        hideAlert('Failed to save dashboard', false, true);
      }
    }).catch((error) => {
      hideAlert(`Error saving dashboard: ${error}`, false, true);
    });
  }

  const deleteTask = (taskId: number): void => {
    setTrackerList(prev => prev.filter(track => track.id !== taskId));
    setIsDirty(true);
  }

  const generateExcelFile = async () => {
    try {
      await exportTimesheetToExcel(trackerList, month, year);
    } catch (error) {
      hideAlert(`Error generating Excel file: ${error}`, false, true);
    }
  };

  React.useEffect(() => {
    loadedTrackerList();
  }, [loadedTrackerList]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <h1 className={classes.title}>Monthly Timesheet</h1>
          <h2>{getMonthName(month)} {year}</h2>
        </div>
        <MonthSelector onMonthChange={handleMonthChange} />
        <ActionsComponent onAddTask={addTask} onGenerateExcelFile={generateExcelFile} onSaveDashboard={saveDashboard} />
      </div>
      <TimeTable trackerList={trackerList} onInputValueNumberChange={handledInputValueNumberChange} onInputValueStringChange={handledInputValueStringChange} onDeleteTask={deleteTask} />

      <Alert message={message} isSuccess={isSuccess} isVisible={isVisible} />
    </div>
  );
};
