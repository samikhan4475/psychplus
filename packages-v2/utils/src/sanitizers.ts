import { SanitizableValue } from '@psychplus-v2/types'

const recursiveSanitize = <T extends Record<string, SanitizableValue>>(
  obj: T,
): T => {
  const result = {} as T

  for (const key in obj) {
    const value = obj[key]

    if (value === '' || value === null || value === undefined) continue

    if (Array.isArray(value)) {
      const cleaned = value
        .map((item) =>
          typeof item === 'object' && item !== null && !Array.isArray(item)
            ? recursiveSanitize(item as Record<string, SanitizableValue>)
            : item,
        )
        .filter(
          (v): v is Exclude<typeof v, '' | null | undefined> =>
            v !== '' && v !== null && v !== undefined,
        )

      if (cleaned.length > 0) {
        result[key] = cleaned as T[typeof key]
      }
    } else if (typeof value === 'object') {
      const cleaned = recursiveSanitize(
        value as Record<string, SanitizableValue>,
      )
      if (Object.keys(cleaned).length > 0) {
        result[key] = cleaned as T[typeof key]
      }
    } else {
      result[key] = value
    }
  }

  return result
}

export { recursiveSanitize }
