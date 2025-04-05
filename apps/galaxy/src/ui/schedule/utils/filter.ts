import { SelectOptionType } from '@/types'

const isDirty = <T extends object>(obj: T): boolean =>
  Object.entries(obj).length > 0

const getServiceFilterOptions = (
  map: Record<string, string>,
  serviceCodes: SelectOptionType[],
) => {
  return serviceCodes.map((code) => ({
    ...code,
    label: map[code.label],
  }))
}

const getSelectedOptions = (
  defaultSelections: string[],
  options: SelectOptionType[],
): string[] => {
  return defaultSelections.filter((selection) =>
    options.find((option) => option.value === selection),
  )
}

const getSelectedOption = (
  defaultSelection: string,
  options: SelectOptionType[],
): string => {
  return (
    options.find((option) => option.value === defaultSelection)?.value ?? ''
  )
}

export {
  isDirty,
  getServiceFilterOptions,
  getSelectedOptions,
  getSelectedOption,
}
