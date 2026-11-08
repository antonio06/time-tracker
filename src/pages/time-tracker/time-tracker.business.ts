export const getDaysOfMonth = (year: number, month: number): string[] => {
  const totalDays = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: totalDays }, (_, index) => {
    const date = new Date(year, month, index + 1);

    const day = date.getDate();

    const weekday = date.toLocaleDateString('en-US', {
      weekday: 'short',
    });

    return `${day} ${weekday}`;
  });
};
