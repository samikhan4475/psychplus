function formatDateManually(isoString: string): string {
  const [datePart] = isoString?.split('T') ?? []
  const [year, month, day] = datePart.split('-')
  return `${month}/${day}/${year}`
}

export { formatDateManually }
