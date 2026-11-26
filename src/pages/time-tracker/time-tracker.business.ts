// Created once and reused: toLocaleDateString with options builds a new ICU formatter on every call
const weekdayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' });

export const getDaysOfMonth = (month: number, year: number): string[] => {
  const jsMonth = month - 1;
  const currentDate = new Date(year, jsMonth + 1, 0);

  if (jsMonth >= 0 && jsMonth <= 11) {
    const totalDays = currentDate.getDate();

    return Array.from({ length: totalDays }, (_, index) => {
      const date = new Date(year, jsMonth, index + 1);

      const day = date.getDate();

      const weekday = weekdayFormatter.format(date);

      return `${day} ${weekday}`;
    });
  }

  return [];
};
