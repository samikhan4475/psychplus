import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { HospitalInitialPrefixes } from './constants'
import { HospitalInitialWidgetSchemaType } from './hospital-initial-widget-schema'
import { createEmptyFormValues } from './utils'

const transformIn = (
  value: QuickNoteSectionItem[],
): HospitalInitialWidgetSchemaType => {
  const result = createEmptyFormValues()

  value.forEach((item) => {
    if (item.sectionItem.includes('Other')) {
      switch (item.sectionItem) {
        case 'strengthsOtherDetails':
          result.strengthsOtherDetails = item.sectionItemValue
          break
        case 'liabilitiesOtherDetails':
          result.liabilitiesOtherDetails = item.sectionItemValue
          break
        case 'stgOtherDetails':
          result.stgOtherDetails = item.sectionItemValue
          break
        case 'precautionsOtherDetails':
          result.precautionsOtherDetails = item.sectionItemValue
          break
        case 'dcplanOtherDetails':
          result.dcplanOtherDetails = item.sectionItemValue
          break

        default:
          break
      }
    }

    const [prefix, _] = item.sectionItem.split('_')

    switch (prefix) {
      case HospitalInitialPrefixes.STRENGTHS:
        result.strengths.push(item.sectionItem)
        break
      case HospitalInitialPrefixes.LIABILITIES:
        result.liabilities.push(item.sectionItem)
        break
      case HospitalInitialPrefixes.NFLOC:
        result.needForLevelOfCare.push(item.sectionItem)
        break
      case HospitalInitialPrefixes.STG:
        result.shortTermGoals.push(item.sectionItem)
        break
      case HospitalInitialPrefixes.PRECAUTIONS:
        result.precautions.push(item.sectionItem)
        break
      case HospitalInitialPrefixes.DCPLAN:
        result.dcPlan.push(item.sectionItem)
        break
      default:
        break
    }
  })

  return result
}

const transformOut =
  (patientId: string) =>
  (schema: HospitalInitialWidgetSchemaType): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []

    Object.entries(schema).forEach(([key, value]) => {
      if (key.includes('Other') && value.length > 0) {
        result.push({
          pid: Number(patientId),
          sectionName: QuickNoteSectionName.QuickNoteSectionHospitalInitial,
          sectionItem: key,
          sectionItemValue: `${value}`,
        })
      }

      Array.isArray(value) &&
        value.forEach((item) => {
          result.push({
            pid: Number(patientId),
            sectionName: QuickNoteSectionName.QuickNoteSectionHospitalInitial,
            sectionItem: item,
            sectionItemValue: '1',
          })
        })

      if (!result.length) {
        result.push({
          sectionItem: '2',
          pid: Number(patientId),
          sectionName: QuickNoteSectionName.QuickNoteSectionHospitalInitial,
          sectionItemValue: '2',
        })
      }
    })

    return result
  }

export { transformIn, transformOut }
