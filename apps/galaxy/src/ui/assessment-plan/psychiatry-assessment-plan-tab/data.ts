import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import { createEmptyFormValues } from './psychiatry-assessment-plan-defaults'
import { PsychiatryAssessmentPlanTabSchemaType } from './psychiatry-assessment-plan-tab-schema'

const transformIn = (
  value: QuickNoteSectionItem[],
): PsychiatryAssessmentPlanTabSchemaType => {
  const result = createEmptyFormValues()

  value?.forEach((item) => {
    switch (item.sectionItem) {
      case 'patientDiscussionCompleted':
        result.patientDiscussionCompleted = item.sectionItemValue as
          | 'yes'
          | 'no'
        break
      case 'assessmentTreatmentPlanNotes':
        result.assessmentTreatmentPlanNotes = item.sectionItemValue
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
        key === 'assessmentTreatmentPlanNotes' ||
        key === 'patientDiscussionCompleted'
      ) {
        result.push({ ...commonProps, sectionItemValue: `${value}` })
      } else if (Array.isArray(value) && value.length > 0) {
        result.push({ ...commonProps, sectionItemValue: String(value) })
      }
    })

    return result
  }

export { transformIn, transformOut }
