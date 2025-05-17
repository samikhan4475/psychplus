const convertCamelToReadable = (camelCaseString: string) => {
  return camelCaseString.replace(/([A-Z])/g, ' $1').toLowerCase()
}

const getPlaceholder = (fieldName: string, isEdit = true) => {
  if (!isEdit) return ''
  const readable = convertCamelToReadable(fieldName).trim()
  return `Enter ${readable}`.replace(/\s+/g, ' ')
}

export { getPlaceholder }
