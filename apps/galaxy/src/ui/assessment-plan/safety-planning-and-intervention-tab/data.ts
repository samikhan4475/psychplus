import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import { createEmptyFormValues } from './safety-planning-intervention-defaults'
import { SafetyPlanningInterventionSchemaType } from './safety-planning-intervention-schema'

const transformIn = (
  value: QuickNoteSectionItem[],
): SafetyPlanningInterventionSchemaType => {
  const result = createEmptyFormValues()
  value?.forEach((item) => {
    if (item.sectionItem.includes('Other')) {
      switch (item.sectionItem) {
        case 'warningSignsOtherDetails':
          result.warningSignsOtherDetails = item.sectionItemValue
          break
        case 'copingStrategiesOtherDetails':
          result.copingStrategiesOtherDetails = item.sectionItemValue
          break
        case 'restrictingAccessOtherDetails':
          result.restrictingAccessOtherDetails = item.sectionItemValue
          break
        default:
          break
      }
    }

    switch (item.sectionItem) {
      case 'widgetContainerCheckboxField':
        result.widgetContainerCheckboxField = item.sectionItemValue
        break
      case 'warningSigns':
      case 'copingStrategies':
      case 'restrictingAccess':
        result[item.sectionItem] = item.sectionItemValue
          ? item.sectionItemValue.split(',')
          : []
        break
      default:
        break
    }
  })
  return result
}

const transformOut =
  (patientId: string) =>
  (schema: SafetyPlanningInterventionSchemaType): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []
    const data = sanitizeFormData(schema)

    Object.entries(data).forEach(([key, value]) => {
      if (value === null) return

      const commonProps = {
        pid: Number(patientId),
        sectionName:
          QuickNoteSectionName.QuicknoteSectionSafetyPlanningIntervention,
        sectionItem: key,
      }

      if (
        key.includes('Other') &&
        typeof value === 'string' &&
        value.length > 0
      ) {
        result.push({ ...commonProps, sectionItemValue: value })
      }

      if (key === 'widgetContainerCheckboxField') {
        result.push({ ...commonProps, sectionItemValue: `${value}` })
      } else if (Array.isArray(value) && value.length > 0) {
        result.push({ ...commonProps, sectionItemValue: String(value) })
      }
    })

    return result
  }

export { transformIn, transformOut }
