// Removes undefined, null, and empty string values from form data before submission

const isValidValue = (value: any): boolean =>
  value !== undefined &&
  value !== null &&
  value !== '' &&
  !(Array.isArray(value) && value.length === 0) &&
  value !== false &&
  value !== 'undefined'

function sanitizeFormData<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) =>
        value !== undefined &&
        value !== null &&
        value !== '' &&
        value?.length !== 0 &&
        value !== false &&
        value !== 'undefined',
    ),
  ) as T
}

function deepSanitizeFormData<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj)
      .map(([key, value]) => {
        if (
          typeof value === 'object' &&
          value !== null &&
          !Array.isArray(value)
        ) {
          return [key, deepSanitizeFormData(value)]
        }
        return [key, value]
      })
      .filter(([_, value]) => isValidValue(value)),
  ) as T
}

export { sanitizeFormData, deepSanitizeFormData }
