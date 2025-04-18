import { TimeValue } from 'react-aria-components'

const extractHoursAndMinsFromTime = (time?: string): string => {
  if (!time) return ''
  const date = new Date(`1970-01-01T${time}Z`) // Convert string to Date
  const hours = date.getUTCHours() // Extract hours
  const minutes = date.getUTCMinutes() // Extract minutes

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`
}

const extractDateAndTimeFromMappedUTCtime = (dateTime: string) => {
  const date = dateTime.split('T')[0]
  const time = dateTime.split('T')[1].split('.')[0]
  return { date, time }
}

const isStartTimeEarlierThanEndTime = (
  startTime: TimeValue,
  endTime: TimeValue,
): boolean => {
  const toSeconds = (time: string): number => {
    const [h, m, s] = time.split(':').map(Number)
    return h * 3600 + m * 60 + s
  }
  return toSeconds(startTime.toString()) < toSeconds(endTime.toString())
}

export {
  extractHoursAndMinsFromTime,
  extractDateAndTimeFromMappedUTCtime,
  isStartTimeEarlierThanEndTime,
}
