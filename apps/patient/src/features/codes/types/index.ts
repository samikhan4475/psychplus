import { NoteSectionItem } from '@/features/note/types'
import { CodesWidgetSchemaType } from '../codes-schema'

enum CptCodeKeys {
  ADD_ONS_KEY = 'cptAddonCodes',
}

type CodesWidgetItem = {
  key: keyof CodesWidgetSchemaType
  code: string
}
type UpdateCptCodes = (
  patientId: string,
  widgetAllCptCodes: CodesWidgetItem[],
  selectedCodes: CodesWidgetItem[],
) => Promise<NoteSectionItem[]>

interface SelectOptionType {
  label: string
  value: string
  disabled?: boolean
}

export {
  type CodesWidgetItem,
  CptCodeKeys,
  type UpdateCptCodes,
  type SelectOptionType,
}
