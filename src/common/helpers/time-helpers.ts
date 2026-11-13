export const getDaysInMonth = (month: number, year: number): Date[] => {
  const jsMonth = month - 1;
  const totalDays = new Date(year, jsMonth + 1, 0).getDate();

  return Array.from(
    { length: totalDays },
    (_, index) => new Date(year, jsMonth, index + 1)
  );
}
