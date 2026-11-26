import { getDaysInMonth, getShortDayLabel } from '@/common/helpers';

// Labels of the Excel header, e.g. ["1 Sun", "2 Mon", ...]. Empty when the month is not 1-12
export const getDaysOfMonth = (month: number, year: number): string[] => (
  month >= 1 && month <= 12 ? getDaysInMonth(month, year).map(getShortDayLabel) : []
);
