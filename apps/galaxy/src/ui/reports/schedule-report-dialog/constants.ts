import { INTERVAL, REPEAT_INTERVAL } from "../types";

export const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const intervalOptions = [
  { label: 'Day', value: INTERVAL.DAY },
  { label: 'Week', value: INTERVAL.WEEK },
  { label: 'Month', value: INTERVAL.MONTH },
  { label: 'Year', value: INTERVAL.YEAR },
];

export const repeatCountOptions = [
  { label: 'Do not Repeat', value: REPEAT_INTERVAL.NOREPEAT },
  { label: '1', value: REPEAT_INTERVAL.ONE },
  { label: '2', value: REPEAT_INTERVAL.TWO },
  { label: '3', value: REPEAT_INTERVAL.THREE },
];