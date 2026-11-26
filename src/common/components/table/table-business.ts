// The totals are calculated in @/common/helpers (totals-helpers). Rounding them for display is done here
export const getRoundPerTwoDigits = (value: number) => value ? value.toFixed(2) : '0.00';
