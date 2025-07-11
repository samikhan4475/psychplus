const parseDropdownOptions = (raw: string): string[] => {
  if (raw === '1-365') {
    return Array.from({ length: 365 }, (_, i) => (i + 1).toString())
  }
  return raw.split('/')
}
export { parseDropdownOptions }
