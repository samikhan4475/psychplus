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
  const cstDateString = inputDate.toLocaleString('en-US')

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
    // timeZoneName: 'short',
    hour12: true,
    // timeZone: TIMEZONE_FORMAT,
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
    // timeZone: TIMEZONE_FORMAT,
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

const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  })
}

function parseDateString(dateString: string) {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
}

const getFirstDayOfWeek = (today?: Date): Date => {
  if (!today) {
    today = new Date()
  }
  const dayOfWeek = today.getDay()
  const firstDayOfWeek = new Date(today)

  const offset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  firstDayOfWeek.setDate(today.getDate() + offset)

  return firstDayOfWeek
}


function getLastDayOfWeek(date?: Date) {
  if (!date) {
    date = new Date()
  }
  const lastDay = new Date(date)
  const dayOfWeek = lastDay.getDay()
  const diffToLastDay = 6 - dayOfWeek

  lastDay.setDate(lastDay.getDate() + diffToLastDay)
  return lastDay
}

const convertToLocalISOString = (dateString: string) => {
  const date = new Date(dateString)
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return localDate.toISOString().slice(0, -1) // Remove the 'Z'
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
  formatCurrency,
  getFirstDayOfWeek,
  parseDateString,
  getLastDayOfWeek,
  convertToLocalISOString,
}