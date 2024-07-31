const convertCamelToReadable = (camelCaseString: string) => {
  return camelCaseString.replace(/([A-Z])/g, ' $1').toLowerCase()
}

const getPlaceholder = (fieldName: string, isEdit: boolean) =>
  isEdit ? `Enter ${convertCamelToReadable(fieldName)}` : ''
export { getPlaceholder }
