import { SelectOptionType } from './types'

const getNestedValue = <T>(obj: T, path: string[], separator = ' '): string => {
  const value = path
    .map((item) => obj[item as keyof T] as keyof string)
    .join(separator)
  return value
}

const transformInOption = <T>(
  arr: T[],
  key: keyof T,
  valueKey?: keyof T,
  nested?: boolean,
  nestedKeys?: string[],
  separator: string = ' ',
): SelectOptionType[] => {
  if (nested && (!nestedKeys || nestedKeys.length === 0)) {
         return []
  }
  return arr.map((item) => {
    const label = nested
      ? getNestedValue(item[key], nestedKeys!, separator)
      : (item[key] as unknown as string)

    const value = valueKey ? item[valueKey] : item[key]

    return {
      label,
      value: String(value),
    }
  })
}

export { transformInOption }
