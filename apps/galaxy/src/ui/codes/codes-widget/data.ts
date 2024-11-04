import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import { CodesWidgetSchemaType } from './codes-widget-schema'

const transformOut =
  (patientId: string) =>
  (schema: CodesWidgetSchemaType): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []

    const data = sanitizeFormData(schema)
    data.primaryCode.map((primaryCode) => {
      result.push({
        pid: Number(patientId),
        sectionName: QuickNoteSectionName.QuickNoteSectionPrimaryCode,
        sectionItem: primaryCode,
        sectionItemValue: primaryCode,
      })
    })

    return result
  }

const transformIn = (value: QuickNoteSectionItem[]): CodesWidgetSchemaType => {
  const result: CodesWidgetSchemaType = {
    primaryCode: [],
    modifierCode: [],
    addOns: [],
  }

  value.forEach((item) => {
    result.primaryCode.push(item.sectionItemValue)
  })

  return result
}

export { transformIn, transformOut }
