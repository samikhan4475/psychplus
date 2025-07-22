const getDateLabel = (_date: string) => {
  const date = new Date(_date)
  const currentDate = new Date().toISOString().split('T')[0]

  if (currentDate === _date) {
    return 'Today'
  }
  return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)
}

export { getDateLabel }
