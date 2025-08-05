import { DetailsType } from '@/components'

interface TextDetails {
  type: DetailsType
  field: string
  maxLength?: number
}
interface MultiSelectDetails {
  type: 'multi-select'
  label: string
  options: Array<{ label: string; value: string }>
  field: string
  hideSelectedCount?: boolean
  isOptionsChip?: boolean
}
type Details = TextDetails | MultiSelectDetails
interface LabelValueOption {
  label: string
  value: string
  details?: Details
}

export type { TextDetails, MultiSelectDetails, Details, LabelValueOption }
