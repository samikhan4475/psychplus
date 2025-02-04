import { CodesWidgetSchemaType } from '@/ui/codes/codes-widget/codes-widget-schema'
import { QuickNoteSectionItem } from './quicknote'

enum CptCodeKeys {
  ADD_ONS_KEY = 'cptAddonCodes',
  MODIFIER_KEY = 'cptmodifierCodes',
  PRIMARY_CODE_KEY = 'cptPrimaryCodes',
}

type CodesWidgetItem = {
  key: keyof CodesWidgetSchemaType
  code: string
}
type UpdateCptCodes = (
  patientId: string,
  appointmentId: string,
  widgetAllCptCodes: CodesWidgetItem[],
  selectedCodes: CodesWidgetItem[],
) => Promise<QuickNoteSectionItem[]>

export { type CodesWidgetItem, CptCodeKeys, type UpdateCptCodes }
