export const getDaysInMonth = (month: number, year: number): Date[] => {
  const totalDays = new Date(year, month + 1, 0).getDate();

  return Array.from(
    { length: totalDays },
    (_, index) => new Date(year, month, index + 1)
  );
}
