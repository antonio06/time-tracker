import { describe, it, expect, vi, afterEach } from 'vitest';
import { Workbook } from 'exceljs';
import type { Row } from 'exceljs';
import * as vm from '@/common/model';
import { buildTimesheetWorkbook, downloadFile, exportTimesheetToExcel, getExcelFileName } from './time-tracker.excel';

const MONTH = 2; // February (1-based)
const YEAR = 2026; // February 2026 has 28 days and starts on a Sunday
const DAYS_IN_MONTH = 28;
const SHEET_NAME = 'February 2026';

const createTracker = (id: number, task: string, hoursByDateId: Record<number, number>): vm.DashboardVm => ({
  id,
  task,
  monthId: MONTH,
  yearId: YEAR,
  workedHours: Object.entries(hoursByDateId).map(([dateId, value]) => ({
    value,
    taskId: id,
    dateId: Number(dateId),
  })),
});

// Row values are 1-based (index 0 is empty), so drop it to compare by column order
const getRowValues = (row: Row): unknown[] => (row.values as unknown[]).slice(1);

// A row of zeros for the days of the month, with the given hours set by 0-based day index
const createDaysRow = (hoursByDateId: Record<number, number>): number[] => (
  Array.from({ length: DAYS_IN_MONTH }, (_, dateId) => hoursByDateId[dateId] ?? 0)
);

const getSheet = (workbook: Workbook) => {
  const worksheet = workbook.getWorksheet(SHEET_NAME);
  if (!worksheet) {
    throw new Error(`Worksheet "${SHEET_NAME}" not found`);
  }
  return worksheet;
};

// The spec runs in a Node environment, so the DOM APIs used to download the file are replaced
const stubBrowserDownload = () => {
  const link = { href: '', download: '', click: vi.fn(), remove: vi.fn() };
  const appendChild = vi.fn();

  vi.stubGlobal('document', {
    createElement: vi.fn(() => link),
    body: { appendChild },
  });

  const createObjectURL = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:fake-url');
  const revokeObjectURL = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => { });

  return { link, appendChild, createObjectURL, revokeObjectURL };
};

describe('time tracker excel spec', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  describe('getExcelFileName', () => {
    it('Should return the file name with the lowercase month name', () => {
      // Arrange
      const month = 11;

      // Act
      const result = getExcelFileName(month);

      // Assert
      expect(result).toBe('time-tracker-november.xlsx');
    });

    it('Should return the file name without month name when the month is invalid', () => {
      // Arrange
      const month = 13;

      // Act
      const result = getExcelFileName(month);

      // Assert
      expect(result).toBe('time-tracker-.xlsx');
    });
  });

  describe('buildTimesheetWorkbook', () => {
    it('Should create a worksheet named after the month and year', () => {
      // Arrange
      const workbook = new Workbook();

      // Act
      buildTimesheetWorkbook(workbook, [], MONTH, YEAR);

      // Assert
      expect(workbook.worksheets.map((worksheet) => worksheet.name)).toEqual([SHEET_NAME]);
    });

    it('Should return the same workbook it received', () => {
      // Arrange
      const workbook = new Workbook();

      // Act
      const result = buildTimesheetWorkbook(workbook, [], MONTH, YEAR);

      // Assert
      expect(result).toBe(workbook);
    });

    it('Should write the header with Task, one column per day with its weekday, and Total', () => {
      // Arrange
      const workbook = new Workbook();

      // Act
      buildTimesheetWorkbook(workbook, [], MONTH, YEAR);

      // Assert
      const headerValues = getRowValues(getSheet(workbook).getRow(1));
      expect(headerValues).toHaveLength(DAYS_IN_MONTH + 2);
      expect(headerValues[0]).toBe('Task');
      expect(headerValues[1]).toBe('1 Sun');
      expect(headerValues[2]).toBe('2 Mon');
      expect(headerValues[7]).toBe('7 Sat');
      expect(headerValues[8]).toBe('8 Sun');
      expect(headerValues[DAYS_IN_MONTH]).toBe('28 Sat');
      expect(headerValues[DAYS_IN_MONTH + 1]).toBe('Total');
    });

    it('Should style the header row', () => {
      // Arrange
      const workbook = new Workbook();

      // Act
      buildTimesheetWorkbook(workbook, [], MONTH, YEAR);

      // Assert
      const headerRow = getSheet(workbook).getRow(1);
      expect(headerRow.font).toEqual({ bold: true, color: { argb: 'FFFFFFFF' } });
      expect(headerRow.fill).toEqual({ type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } });
      expect(headerRow.alignment).toEqual({ horizontal: 'center', vertical: 'middle' });
      expect(headerRow.height).toBe(30);
    });

    it('Should set the width of the task, day and total columns', () => {
      // Arrange
      const workbook = new Workbook();

      // Act
      buildTimesheetWorkbook(workbook, [], MONTH, YEAR);

      // Assert
      const worksheet = getSheet(workbook);
      expect(worksheet.getColumn(1).width).toBe(20);
      expect(worksheet.getColumn(2).width).toBe(12);
      expect(worksheet.getColumn(DAYS_IN_MONTH + 1).width).toBe(12);
      expect(worksheet.getColumn(DAYS_IN_MONTH + 2).width).toBe(15);
    });

    it('Should write a row per task with its hours per day and its total', () => {
      // Arrange
      const workbook = new Workbook();
      const trackerList = [createTracker(1, 'Task 1', { 0: 2, 1: 3.5, 27: 1 })];

      // Act
      buildTimesheetWorkbook(workbook, trackerList, MONTH, YEAR);

      // Assert
      const taskValues = getRowValues(getSheet(workbook).getRow(2));
      expect(taskValues).toEqual(['Task 1', ...createDaysRow({ 0: 2, 1: 3.5, 27: 1 }), 6.5]);
    });

    it('Should write days without worked hours as 0', () => {
      // Arrange
      const workbook = new Workbook();
      const trackerList = [createTracker(1, 'Task 1', {})];

      // Act
      buildTimesheetWorkbook(workbook, trackerList, MONTH, YEAR);

      // Assert
      const taskValues = getRowValues(getSheet(workbook).getRow(2));
      expect(taskValues).toEqual(['Task 1', ...createDaysRow({}), 0]);
    });

    it('Should write the Total row with the totals per day and the grand total', () => {
      // Arrange
      const workbook = new Workbook();
      const trackerList = [
        createTracker(1, 'Task 1', { 0: 2, 1: 3 }),
        createTracker(2, 'Task 2', { 0: 4, 1: 1 }),
      ];

      // Act
      buildTimesheetWorkbook(workbook, trackerList, MONTH, YEAR);

      // Assert
      const worksheet = getSheet(workbook);
      expect(worksheet.rowCount).toBe(4); // header + 2 tasks + total
      expect(getRowValues(worksheet.getRow(2))[DAYS_IN_MONTH + 1]).toBe(5);
      expect(getRowValues(worksheet.getRow(3))[DAYS_IN_MONTH + 1]).toBe(5);
      expect(getRowValues(worksheet.getRow(4))).toEqual(['Total', ...createDaysRow({ 0: 6, 1: 4 }), 10]);
    });

    it('Should write only the header and a Total row of zeros when there are no tasks', () => {
      // Arrange
      const workbook = new Workbook();

      // Act
      buildTimesheetWorkbook(workbook, [], MONTH, YEAR);

      // Assert
      const worksheet = getSheet(workbook);
      expect(worksheet.rowCount).toBe(2);
      expect(getRowValues(worksheet.getRow(2))).toEqual(['Total', ...createDaysRow({}), 0]);
    });

    it('Should style the Total row', () => {
      // Arrange
      const workbook = new Workbook();
      const trackerList = [createTracker(1, 'Task 1', { 0: 2 })];

      // Act
      buildTimesheetWorkbook(workbook, trackerList, MONTH, YEAR);

      // Assert
      const totalRow = getSheet(workbook).getRow(3);
      expect(totalRow.font).toEqual({ bold: true });
      expect(totalRow.fill).toEqual({ type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE0E7FF' } });
    });

    it('Should produce a workbook that can be written to a buffer', async () => {
      // Arrange
      const workbook = new Workbook();
      const trackerList = [createTracker(1, 'Task 1', { 0: 2 })];

      // Act
      buildTimesheetWorkbook(workbook, trackerList, MONTH, YEAR);
      const buffer = await workbook.xlsx.writeBuffer();

      // Assert
      expect(buffer.byteLength).toBeGreaterThan(0);
    });
  });

  describe('downloadFile', () => {
    it('Should create an xlsx blob and a link pointing to it with the given file name', () => {
      // Arrange
      const { link, createObjectURL } = stubBrowserDownload();

      // Act
      downloadFile('content', 'report.xlsx');

      // Assert
      const blob = createObjectURL.mock.calls[0][0] as Blob;
      expect(blob.type).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      expect(link.href).toBe('blob:fake-url');
      expect(link.download).toBe('report.xlsx');
    });

    it('Should add the link to the body, click it and remove it', () => {
      // Arrange
      const { link, appendChild } = stubBrowserDownload();

      // Act
      downloadFile('content', 'report.xlsx');

      // Assert
      expect(appendChild).toHaveBeenCalledWith(link);
      expect(link.click).toHaveBeenCalledTimes(1);
      expect(link.remove).toHaveBeenCalledTimes(1);
      expect(appendChild.mock.invocationCallOrder[0]).toBeLessThan(link.click.mock.invocationCallOrder[0]);
      expect(link.click.mock.invocationCallOrder[0]).toBeLessThan(link.remove.mock.invocationCallOrder[0]);
    });

    it('Should revoke the object url once the link is removed', () => {
      // Arrange
      const { link, revokeObjectURL } = stubBrowserDownload();

      // Act
      downloadFile('content', 'report.xlsx');

      // Assert
      expect(revokeObjectURL).toHaveBeenCalledWith('blob:fake-url');
      expect(link.remove.mock.invocationCallOrder[0]).toBeLessThan(revokeObjectURL.mock.invocationCallOrder[0]);
    });
  });

  describe('exportTimesheetToExcel', () => {
    it('Should download an xlsx file named after the month', async () => {
      // Arrange
      const { link, createObjectURL, revokeObjectURL } = stubBrowserDownload();
      const trackerList = [createTracker(1, 'Task 1', { 0: 2 })];

      // Act
      await exportTimesheetToExcel(trackerList, MONTH, YEAR);

      // Assert
      const blob = createObjectURL.mock.calls[0][0] as Blob;
      expect(blob.size).toBeGreaterThan(0);
      expect(link.download).toBe('time-tracker-february.xlsx');
      expect(link.click).toHaveBeenCalledTimes(1);
      expect(revokeObjectURL).toHaveBeenCalledWith('blob:fake-url');
    });
  });
});
