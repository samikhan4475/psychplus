import { CptCodeKeys, QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import { CodesWidgetSchemaType } from './codes-widget-schema'
import { visitSpecificCodes } from './utils'

const transformOut =
  (patientId: string, appId?: string) =>
  (schema: CodesWidgetSchemaType): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []
    const visitSpecificCodesSet = new Set(
      visitSpecificCodes.map((item) => item.code.trim()),
    )

    let lastPrimaryCode: QuickNoteSectionItem | null = null
    const pid = Number(patientId)
    const numericAppId = appId ? Number(appId) : undefined

    Object.entries(sanitizeFormData(schema)).forEach(
      ([sectionItem, values]) => {
        if (!Array.isArray(values)) return

        values.forEach((value) => {
          const sectionItemObj: QuickNoteSectionItem = {
            pid,
            sectionName: QuickNoteSectionName.QuicknoteSectionCodes,
            sectionItem,
            sectionItemValue: value,
          }

          if (sectionItem === CptCodeKeys.PRIMARY_CODE_KEY) {
            lastPrimaryCode = { ...sectionItemObj, appId: numericAppId }
          } else if (visitSpecificCodesSet.has(value)) {
            sectionItemObj.appId = numericAppId
            result.push(sectionItemObj)
          } else {
            result.push(sectionItemObj)
          }
        })
      },
    )

    if (lastPrimaryCode) {
      result.push(lastPrimaryCode)
    }

    return result
  }

const transformIn = (value: QuickNoteSectionItem[]): CodesWidgetSchemaType => {
  const result: CodesWidgetSchemaType = {
    cptPrimaryCodes: [],
    cptmodifierCodes: [],
    cptAddonCodes: [],
  }
  value.forEach(({ sectionItem, sectionItemValue }) => {
    switch (sectionItem) {
      case CptCodeKeys.PRIMARY_CODE_KEY:
        result.cptPrimaryCodes.push(sectionItemValue)
        break
      case CptCodeKeys.ADD_ONS_KEY:
        result.cptAddonCodes.push(sectionItemValue)
        break
      case CptCodeKeys.MODIFIER_KEY:
        result.cptmodifierCodes.push(sectionItemValue)
        break
      default:
        break
    }
  })

  return result
}

const transformInAppointmentCodes = (
  codesResultData: QuickNoteSectionItem[],
  appointmentCodeResultData: QuickNoteSectionItem[],
): CodesWidgetSchemaType => {
  return transformIn([
    ...appointmentCodeResultData.filter(({ appId }) => appId),
    ...codesResultData.filter(({ appId }) => !appId),
  ])
}

export { transformIn, transformOut, transformInAppointmentCodes }
