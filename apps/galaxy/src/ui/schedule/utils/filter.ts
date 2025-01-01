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

export { isDirty, getServiceFilterOptions }
