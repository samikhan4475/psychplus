import { CodesWidgetSchemaType } from '@/ui/codes/codes-widget/codes-widget-schema'

enum CptCodeKeys {
  ADD_ONS_KEY = 'cptAddonCodes',
  MODIFIER_KEY = 'cptmodifierCodes',
  PRIMARY_CODE_KEY = 'cptPrimaryCodes',
}

type CodesWidgetItem = {
  key: keyof CodesWidgetSchemaType
  code: string
}

export { type CodesWidgetItem, CptCodeKeys }
