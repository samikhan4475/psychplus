import { SelectOptionType } from '@/types'

const getPermissionSectionTitle = (
  sectionCode: string,
  options: SelectOptionType[],
) => {
  return options.find((option) => option.value === sectionCode)?.label ?? ''
}

export { getPermissionSectionTitle }
