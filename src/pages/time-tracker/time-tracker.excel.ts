import type { Workbook } from 'exceljs';
import * as vm from '@/common/model';
import { getMonthName, getTaskHoursByDay, getTaskTotal, getDayTotal, getMonthTotal } from '@/common/helpers';
import { getDaysOfMonth } from './time-tracker.business';

// Only types are imported from exceljs at the top level. The library itself is
// loaded with a dynamic import in exportTimesheetToExcel, so it stays out of the main bundle.

const EXCEL_MIME_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export const getExcelFileName = (month: number, year: number): string => (
  `time-tracker-${year}-${String(month).padStart(2, '0')}.xlsx`
);

export const buildTimesheetWorkbook = (
  workbook: Workbook,
  trackerList: vm.DashboardVm[],
  month: number,
  year: number
): Workbook => {
  const worksheet = workbook.addWorksheet(`${getMonthName(month)} ${year}`);

  const days = getDaysOfMonth(month, year);

  // Create the header
  const headers = ['Task', ...days, 'Total'];

  // Add the first row
  const headerRow = worksheet.addRow(headers);

  // Header styles
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

  // Set the column widths
  worksheet.columns = [
    { width: 20 },
    ...days.map(() => ({ width: 12 })),
    { width: 15 },
  ];

  trackerList.forEach((tracker) => {
    const workedHoursByDay = days.map((_, index) => {
      return getTaskHoursByDay(tracker, index);
    });

    const totalHours = getTaskTotal(tracker, days.length);

    worksheet.addRow([
      tracker.task,
      ...workedHoursByDay,
      totalHours,
    ]);
  });

  const dailyTotals = days.map((_, index) => {
    return getDayTotal(trackerList, index);
  });

  const grandTotal = getMonthTotal(trackerList, days.length);

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

  return workbook;
};

export const downloadFile = (content: BlobPart, fileName: string): void => {
  const blob = new Blob([content], { type: EXCEL_MIME_TYPE });

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
};

export const exportTimesheetToExcel = async (
  trackerList: vm.DashboardVm[],
  month: number,
  year: number
): Promise<void> => {
  // Load exceljs on demand so it is not part of the main bundle
  const exceljs = await import('exceljs');

  const workbook = buildTimesheetWorkbook(new exceljs.Workbook(), trackerList, month, year);

  const buffer = await workbook.xlsx.writeBuffer();

  downloadFile(buffer as BlobPart, getExcelFileName(month, year));
};
