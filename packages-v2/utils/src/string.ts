const truncateWithEllipsis = (value: string, maxLength = 50): string => {
  if (value.length > maxLength) {
    return value.slice(0, maxLength) + '...'
  }
  return value
}

export { truncateWithEllipsis }
