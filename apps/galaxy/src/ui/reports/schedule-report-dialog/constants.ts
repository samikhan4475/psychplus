import { INTERVAL, REPEAT_INTERVAL } from '../types'

export const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

export const intervalOptions = [
  { label: 'Week', value: INTERVAL.WEEK },
  { label: 'Month', value: INTERVAL.MONTH },
  { label: 'Year', value: INTERVAL.YEAR },
]

export const durationIntervalOptions = [
  { label: 'Day', value: INTERVAL.DAY },
  { label: 'Week', value: INTERVAL.WEEK },
  { label: 'Month', value: INTERVAL.MONTH },
  { label: 'Year', value: INTERVAL.YEAR },
]

export const repeatCountOptions = [
  { label: 'Do not Repeat', value: REPEAT_INTERVAL.NOREPEAT },
  { label: '1', value: REPEAT_INTERVAL.ONE },
]
export const monthRepeatCountOptions = [
  { label: 'Do not Repeat', value: REPEAT_INTERVAL.NOREPEAT },
  { label: '1', value: REPEAT_INTERVAL.ONE },
  { label: '3', value: REPEAT_INTERVAL.THREE },
  { label: '6', value: REPEAT_INTERVAL.SIX },
]
export const durationOptions = [
  { label: 'Last', value: 'last' },
  { label: 'Current', value: 'current' },
]
