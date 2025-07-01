import { SelectOptionType } from '@/types'

const getServiceLabel = (options: SelectOptionType[], value: string) =>
  options?.find((option) => option.value === value)?.label

export { getServiceLabel }
