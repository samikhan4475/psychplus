import { TIMEZONE_FORMAT } from '../constants'

const isEmptyDate = (date?: Date | string) =>
  !date || new Date(date).getUTCFullYear() === 1

const daysAgo = (days: number) =>
  new Date(new Date().setDate(new Date().getDate() - days))

const formatDateToCst = (date: Date | string) => {
  const cstDateString = new Date(date).toLocaleString('en-US', {
    timeZone: TIMEZONE_FORMAT,
  })

  return new Date(cstDateString)
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
  }).format(date)
}

const formatDateYmd = (inputDate: Date) => {
  const cstDateString = inputDate.toLocaleString('en-US', {
    timeZone: TIMEZONE_FORMAT,
  })

  const date = new Date(cstDateString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}

function formatStartDate(startDate?: string) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
    hour12: true,
    timeZone: TIMEZONE_FORMAT,
  }

  if (startDate) {
    let formattedDate = new Date(startDate).toLocaleString('en-US', options)

    formattedDate = formattedDate.replace(/,([^,]*)$/, ' - $1')

    formattedDate = formattedDate.replace(/\s([ap]m)/i, (match) =>
      match.toLowerCase(),
    )
    return formattedDate
  }
}

const formatTimeWithAmPm = (date: string) => {
  const dateTime = new Date(date)

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: TIMEZONE_FORMAT,
  }

  return dateTime.toLocaleTimeString('en-US', options)
}

const formatTime = (date: Date) => {
  let hours: number | string = date.getHours()
  hours = hours < 10 ? `0${hours}` : hours

  let minutes: number | string = date.getMinutes()
  minutes = minutes < 10 ? `0${minutes}` : minutes

  return `${hours}:${minutes}`
}

const formatLocaleDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: TIMEZONE_FORMAT,
  }

  return date.toLocaleString('en-US', options)
}

const formatDateTime = (date: Date) => `${formatDate(date)} ${formatTime(date)}`

const calculateAge = (date?: string | Date) => {
  const today = new Date()
  const birthDate = new Date(date ?? '')
  const age =
    today.getFullYear() -
    birthDate.getFullYear() -
    (today.getMonth() - birthDate.getMonth() < 0 ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate())
      ? 1
      : 0)

  return age
}

export {
  isEmptyDate,
  daysAgo,
  formatDate,
  formatDateYmd,
  formatStartDate,
  formatTime,
  formatTimeWithAmPm,
  formatLocaleDate,
  formatDateTime,
  formatDateToCst,
  calculateAge,
}
