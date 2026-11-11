import React from 'react';
import { Workbook } from 'exceljs';
import { TimeTable } from '../../common/components'
import { ActionsComponent } from './components/actions-component';
import * as vm from '../../common/model';
import * as api from './api';
import { getMonthName } from '../../common/helpers';
import { mapToVm, createEmptyTrack, mapToModel } from './time-tracker.mapper';
import { getDaysOfMonth, getDailyTotals, getGrandTotal, getWorkedHoursByDay, getTotalHours } from './time-tracker.business';
import { getDaysInMonth } from '../../common/helpers';
import classes from './time-tracker.module.css';

export const TimeTrackerPage: React.FC = () => {
  const [trackerList, setTrackerList] = React.useState<vm.DashboardVm[]>([]);

  const loadedTrackerList = () => {
    api.getTrackerList().then((result) => {
      if (result) {
        const mappedData = mapToVm(result);
        setTrackerList(mappedData);
      } else {
        console.error('Failed to load tracker list');
      }
    }).catch((error) => {
      console.error('Error loading tracker list:', error);
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
    const currentDate = new Date();
    const year = import.meta.env.VITE_IS_MOCK === 'true' ? 2026 : currentDate.getFullYear();
    const month = import.meta.env.VITE_IS_MOCK === 'true' ? 10 : currentDate.getMonth();
    const newTask = {
      ...createEmptyTrack(trackerList.length, getDaysInMonth(year, month).length),
    }

    api.saveTask(newTask).then((isSaved) => {
      if (isSaved) {
        setTrackerList([...trackerList, newTask]);
      } else {
        console.error('Failed to save task');
      }
    }).catch((error) => {
      console.error('Error saving task:', error);
    });
  }

  const saveDashboard = () => {
    const dashboardModel = mapToModel(trackerList);

    api.saveDashboard(dashboardModel).then((isSaved) => {
      if (isSaved) {
        console.log('Dashboard saved successfully');
        loadedTrackerList();
      } else {
        console.error('Failed to save dashboard');
      }
    }).catch((error) => {
      console.error('Error saving dashboard:', error);
    });
  }

  const deleteTask = (taskId: number): void => {
    api.deletedTask(taskId).then((isDeleted) => {
      if (isDeleted) {
        loadedTrackerList();
      } else {
        console.error('Failed to delete task');
      }
    });
  }

  const generateExcelFile = async () => {
    const workbook = new Workbook();

    const worksheet = workbook.addWorksheet('November 2026');

    const currentDate = new Date();
    const year = import.meta.env.VITE_IS_MOCK === 'true' ? 2026 : currentDate.getFullYear();
    const month = import.meta.env.VITE_IS_MOCK === 'true' ? 10 : currentDate.getMonth();

    const days = getDaysOfMonth(year, month);

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
    link.download = 'time-tracker-november.xlsx';

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  const month: number = import.meta.env.VITE_MONTH === 'true' ? 10 : new Date().getMonth();

  React.useEffect(() => {
    loadedTrackerList();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <h1 className={classes.title}>Monthly Timesheet</h1>
          <h2>{getMonthName(month)} {new Date().getFullYear()}</h2>
        </div>
        <ActionsComponent onAddTask={addTask} onGenerateExcelFile={generateExcelFile} onSaveDashboard={saveDashboard} />
      </div>
      <TimeTable trackerList={trackerList} onInputValueNumberChange={handledInputValueNumberChange} onInputValueStringChange={handledInputValueStringChange} onDeleteTask={deleteTask} />
    </div>
  );
};
