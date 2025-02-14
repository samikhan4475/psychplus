import { SelectOptionType } from '@/types'
import { MseWidgetSchemaType } from './mse-widget-schema'

type DetailsType = 'text' | 'number' | 'select' | 'date'
interface GroupSelectOption<T extends string> {
  label: string
  value: T
  details?: SelectableChipDetailsProps
  radioOption?: SelectOptionType[]
  isTooltip?: boolean
}
interface SelectableChipDetailsProps {
  type: DetailsType
  label?: string
  field: keyof MseWidgetSchemaType
  options?: { label: string; value: string }[]
  format?: string
  isDisabled?: boolean
  maxLength?: number
}
export interface MseHistoryParams {
  historyCreatedFrom?: string
  historyCreatedTo?: string
  username?: string
}
export type { GroupSelectOption }
