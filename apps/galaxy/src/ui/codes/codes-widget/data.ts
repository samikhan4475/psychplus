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
    Object.entries(sanitizeFormData(schema)).forEach(
      ([sectionItem, values]) => {
        Array.isArray(values) &&
          values.forEach((value) => {
            const sectionItemObj: QuickNoteSectionItem = {
              pid: Number(patientId),
              sectionName: QuickNoteSectionName.QuicknoteSectionCodes,
              sectionItem,
              sectionItemValue: value,
            }

            if (
              (appId && sectionItem === CptCodeKeys.PRIMARY_CODE_KEY) ||
              visitSpecificCodesSet.has(value)
            ) {
              sectionItemObj.appId = Number(appId)
            }
            result.push(sectionItemObj)
          })
      },
    )

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
