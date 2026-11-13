import React from 'react';
import { Workbook } from 'exceljs';
import { TimeTable } from '../../common/components'
import { ActionsComponent, MonthSelector } from './components';
import { Alert, useHideMessage } from '../../common/components/alert';
import * as vm from '../../common/model';
import * as api from './api';
import { getMonthName } from '../../common/helpers';
import { mapToVm, createEmptyTrack, mapToModel } from './time-tracker.mapper';
import { getDaysOfMonth, getDailyTotals, getGrandTotal, getWorkedHoursByDay, getTotalHours } from './time-tracker.business';
import { getDaysInMonth } from '../../common/helpers';
import { useTimeContext } from '../../common/context';
import classes from './time-tracker.module.css';

export const TimeTrackerPage: React.FC = () => {
  const [trackerList, setTrackerList] = React.useState<vm.DashboardVm[]>([]);
  const { message, isSuccess, isVisible, hideAlert } = useHideMessage();
  const { month, year } = useTimeContext();

  const loadedTrackerList = () => {

    api.getTrackerList(month, year).then((result) => {
      console.log(month)
      if (result) {
        const mappedData = mapToVm(result);
        setTrackerList(mappedData);
      } else {
        hideAlert('Failed to load tracker list', false, true);
      }
    }).catch((error) => {
      hideAlert(`Error loading tracker list: ${error}`, false, true);
    });
  }

  const handledInputValueNumberChange = (taskId: number, dateId: number, newValue: number) => {
    const updatedTrackerList = trackerList.map(track => {
      return taskId === track.id ? { ...track, workedHours: updateWorkedHours(track, dateId, newValue) } : { ...track }
    })

    setTrackerList([...updatedTrackerList]);
  }

  const updateWorkedHours = (track: vm.DashboardVm, dateId: number, newValue: number): vm.WorkedHoursVm[] => {
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
      ...createEmptyTrack(getDaysInMonth(month, year).length, month, year),
    }

    console.log(newTask);

    api.saveTask(newTask).then((isSaved) => {
      if (isSaved) {
        setTrackerList([...trackerList, newTask]);
      } else {
        hideAlert('Failed to save task', false, true);
      }
    }).catch((error) => {
      hideAlert(`Error saving task: ${error}`, false, true);
    });
  }

  const saveDashboard = () => {
    const dashboardModel = mapToModel(trackerList);

    api.saveDashboard(month, year, dashboardModel).then((isSaved) => {
      if (isSaved) {
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
    api.deletedTask(month, year, taskId).then((isDeleted) => {
      if (isDeleted) {
        loadedTrackerList();
        hideAlert('Task deleted successfully', true, true);
      } else {
        hideAlert('Failed to delete task', false, true);
      }
    }).catch((error) => {
      hideAlert(`Error deleting task: ${error}`, false, true);
    });
  }

  const generateExcelFile = async () => {
    const workbook = new Workbook();
    console.log(month)
    const worksheet = workbook.addWorksheet(`${getMonthName(month)} ${year}`);

    const days = getDaysOfMonth(month, year);

    // Crear la cabecera
    const headers = ['Task', ...days, 'Total'];

    // Añadir la primera fila
    const headerRow = worksheet.addRow(headers);

    // Estilos de la cabecera
    headerRow.font = {
      bold: true,
      color: { argb: 'FFFFFFFF' },
    };

    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF0F172A' },
    };

    headerRow.alignment = {
      horizontal: 'center',
      vertical: 'middle',
    };

    headerRow.height = 30;

    // Ajustar ancho de columnas
    worksheet.columns = [
      { width: 20 },
      ...days.map(() => ({ width: 12 })),
      { width: 15 },
    ];

    trackerList.forEach((tracker) => {
      const workedHoursByDay = days.map((_, index) => {
        return getWorkedHoursByDay(index, tracker);
      });

      const totalHours = getTotalHours(workedHoursByDay);

      worksheet.addRow([
        tracker.task,
        ...workedHoursByDay,
        totalHours,
      ]);
    });

    const dailyTotals = days.map((_, index) => {
      return getDailyTotals(index, trackerList)
    });

    const grandTotal = getGrandTotal(dailyTotals);

    const totalRow = worksheet.addRow([
      'Total',
      ...dailyTotals,
      grandTotal,
    ]);

    totalRow.font = { bold: true };

    totalRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E7FF' },
    };

    // Generar Excel
    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer as BlobPart], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `time-tracker-${getMonthName(month).toLowerCase()}.xlsx`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  React.useEffect(() => {
    loadedTrackerList();
  }, [month]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <h1 className={classes.title}>Monthly Timesheet</h1>
          <h2>{getMonthName(month)} {year}</h2>
        </div>
        <MonthSelector />
        <ActionsComponent onAddTask={addTask} onGenerateExcelFile={generateExcelFile} onSaveDashboard={saveDashboard} />
      </div>
      <TimeTable trackerList={trackerList} onInputValueNumberChange={handledInputValueNumberChange} onInputValueStringChange={handledInputValueStringChange} onDeleteTask={deleteTask} />

      <Alert message={message} isSuccess={isSuccess} isVisible={isVisible} />
    </div>
  );
};
