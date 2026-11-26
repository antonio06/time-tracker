// Created once and reused: toLocaleDateString with options builds a new ICU formatter on every call
const shortWeekdayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
const longDayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

export const getDaysInMonth = (month: number, year: number): Date[] => {
  const jsMonth = month - 1;
  const totalDays = new Date(year, jsMonth + 1, 0).getDate();

  return Array.from(
    { length: totalDays },
    (_, index) => new Date(year, jsMonth, index + 1)
  );
}

// e.g. "1 Sun". Used in the header of the table and of the Excel
export const getShortDayLabel = (date: Date): string => `${date.getDate()} ${shortWeekdayFormatter.format(date)}`;

// e.g. "Monday, November 2". Used in the aria-label of the hour inputs
export const getLongDayLabel = (date: Date): string => longDayFormatter.format(date);

// getDay() is 0 for Sunday and 6 for Saturday, whatever the locale
export const isWeekend = (date: Date): boolean => date.getDay() === 0 || date.getDay() === 6;
