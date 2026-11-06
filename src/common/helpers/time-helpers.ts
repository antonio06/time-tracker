export const getDaysInMonth = (month: number, year: number): Date[] => {
  return new Array(31)
    .fill('')
    .map((v, i) => new Date(year, month - 1, i + 1))
    .filter(v => v.getMonth() === month - 1)
}
