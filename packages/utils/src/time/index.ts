const isEmptyDate = (date?: Date | string) =>
  !date || new Date(date).getUTCFullYear() === 1

const daysAgo = (days: number) =>
  new Date(new Date().setDate(new Date().getDate() - days))

const formatDate = (date: Date) => {
  const d = new Date(date)
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())

  return new Intl.DateTimeFormat('en-US', {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
  }).format(d)
}

const formatTime = (date: Date) => {
  const d = new Date(date)
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())

  let hours: number | string = d.getHours()
  hours = hours < 10 ? `0${hours}` : hours

  let minutes: number | string = d.getMinutes()
  minutes = minutes < 10 ? `0${minutes}` : minutes

  return `${hours}:${minutes}`
}

export { isEmptyDate, daysAgo, formatDate, formatTime }
