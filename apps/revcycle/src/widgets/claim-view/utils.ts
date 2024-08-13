function adjustToUTC(date: string | Date) {
  const localDate = new Date(date)
  const timezoneOffset = localDate.getTimezoneOffset() * 60000
  const utcDate = new Date(localDate.getTime() - timezoneOffset)

  return utcDate
}

export { adjustToUTC }
