import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import { createEmptyFormValues } from './psychiatry-assessment-plan-defaults'
import { PsychiatryAssessmentPlanTabSchemaType } from './psychiatry-assessment-plan-tab-schema'

const transformIn = (
  value: QuickNoteSectionItem[],
  mseData?: QuickNoteSectionItem[],
): PsychiatryAssessmentPlanTabSchemaType => {
  const result = createEmptyFormValues()
  const tcsiYesNo =
    mseData?.find((item) => item.sectionItem === 'tcsiYesNo')
      ?.sectionItemValue ?? ''

  if (tcsiYesNo === 'yes') {
    result.safetyPlanningIntervention = true
  }
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
      case 'patientDiscussionCompleted':
        result.patientDiscussionCompleted = item.sectionItemValue as
          | 'yes'
          | 'no'
        break
      case 'assessmentTreatmentPlanNotes':
        result.assessmentTreatmentPlanNotes = item.sectionItemValue
        break
      case 'safetyPlanningIntervention':
        if (tcsiYesNo !== 'yes') {
          result.safetyPlanningIntervention = item.sectionItemValue === 'true'
        }
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
  return result as PsychiatryAssessmentPlanTabSchemaType
}

const transformOut =
  (patientId: string) =>
  (schema: PsychiatryAssessmentPlanTabSchemaType): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []
    const data = sanitizeFormData(schema)

    Object.entries(data).forEach(([key, value]) => {
      if (value === null) return

      const commonProps = {
        pid: Number(patientId),
        sectionName:
          QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan,
        sectionItem: key,
      }

      if (
        key.includes('Other') &&
        typeof value === 'string' &&
        value.length > 0
      ) {
        result.push({ ...commonProps, sectionItemValue: value })
      }

      if (
        key === 'assessmentTreatmentPlanNotes' ||
        key === 'patientDiscussionCompleted' ||
        key === 'safetyPlanningIntervention'
      ) {
        result.push({ ...commonProps, sectionItemValue: `${value}` })
      } else if (Array.isArray(value) && value.length > 0) {
        result.push({ ...commonProps, sectionItemValue: String(value) })
      }
    })

    return result
  }

export { transformIn, transformOut }
