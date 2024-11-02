import { SelectOptionType } from '@/types'
import { physicalExamWidgetSchema } from './history/physical-exam-details/data'

type DetailsType = 'text' | 'number' | 'select' | 'date'
interface GroupSelectOption<T extends string> {
  label: string
  value: T
  details?: SelectableChipDetailsProps
  radioOption?: SelectOptionType[]
  isTooltip?: boolean
  tooltipContent?: string
}

interface SelectableChipDetailsProps {
  type: DetailsType
  label?: string
  field: keyof physicalExamWidgetSchema
  options?: { label: string; value: string }[]
  format?: string
  isDisabled?: boolean
}

interface PhysicalExamHistoryParams {
  historyCreatedFrom?: string
  historyCreatedTo?: string
  username?: string
}

export type { GroupSelectOption, PhysicalExamHistoryParams }
