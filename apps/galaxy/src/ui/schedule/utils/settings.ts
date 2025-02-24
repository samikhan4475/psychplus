const getStringifiedValue = (value: string | string[] | number[]): string => {
  if (Array.isArray(value)) {
    return value.join('|') || 'null'
  }
  return value ? `${value}` : 'null'
}

export { getStringifiedValue }
