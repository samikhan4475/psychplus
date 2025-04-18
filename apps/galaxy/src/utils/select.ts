import { SelectOptionType } from '@/types'

const getOptionLabel = (
  options: SelectOptionType[],
  value: SelectOptionType['value'],
) => options?.find((item) => item?.value === value)?.label

export { getOptionLabel }
