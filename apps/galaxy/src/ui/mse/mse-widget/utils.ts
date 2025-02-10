const validateYesNoEnum = (value: string): string => {
  switch (value) {
    case '1':
      return 'no'
    case '2':
      return 'yes'
    case '0':
    case '':
      return ''
    default:
      return value.toLowerCase()
  }
}

export { validateYesNoEnum }
