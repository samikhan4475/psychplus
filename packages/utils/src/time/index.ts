const isEmptyDate = (date?: Date | string) =>
  !date || new Date(date).getUTCFullYear() === 1

const daysAgo = (days: number) =>
  new Date(new Date().setDate(new Date().getDate() - days))

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
  }).format(date)
}

const formatTime = (date: Date) => {
  let hours: number | string = date.getHours()
  hours = hours < 10 ? `0${hours}` : hours

  let minutes: number | string = date.getMinutes()
  minutes = minutes < 10 ? `0${minutes}` : minutes

  return `${hours}:${minutes}`
}

const formatDateTime = (date: Date) => `${formatDate(date)} ${formatTime(date)}`

export { isEmptyDate, daysAgo, formatDate, formatTime, formatDateTime }
