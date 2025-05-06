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
  { label: 'Minute', value: INTERVAL.MINUTE },
  { label: 'Hour', value: INTERVAL.HOUR },
  { label: 'Day', value: INTERVAL.DAY },
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
interface MonthOption {
  label: string
  value: string
}

const monthNames: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const monthOptions: MonthOption[] = monthNames.map((month, index) => ({
  label: month,
  value: (index + 1).toString(),
}))

interface MonthDateOption {
  label: string
  value: string
}

export const monthDateOptions: MonthDateOption[] = Array.from(
  { length: 31 },
  (_, index) => ({
    label: (index + 1).toString(),
    value: (index + 1).toString(),
  }),
)

interface WeekdayOption {
  label: string
  value: string
}

const weekdayNames: string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export const weekdayOptions: WeekdayOption[] = weekdayNames.map(
  (day, index) => ({
    label: day,
    value: index.toString(),
  }),
)

interface HourOption {
  label: string
  value: string
}

export const hourOptions: HourOption[] = Array.from(
  { length: 24 },
  (_, index) => ({
    label: index.toString(),
    value: index.toString(),
  }),
)

interface MinuteOption {
  label: string
  value: string
}

export const minuteOptions: MinuteOption[] = Array.from(
  { length: 60 },
  (_, index) => ({
    label: index.toString(),
    value: index.toString(),
  }),
)
