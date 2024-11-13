import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import { createEmptyFormValues } from './therapy-assessment-plan-defaults'
import { TherapyAssessmentPlanTabSchemaType } from './therapy-assessment-plan-tab-schema'

const transformOut =
  (patientId: string) =>
  (schema: TherapyAssessmentPlanTabSchemaType): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []
    const data = sanitizeFormData(schema)
    Object.entries(data).forEach(([key, value]) => {
      result.push({
        pid: Number(patientId),
        sectionName:
          QuickNoteSectionName.QuicknoteSectionTherapyAssessmentPlan,
        sectionItem: key,
        sectionItemValue: value as string,
      })
    })
    return result
  }

const transformIn = (
  value: QuickNoteSectionItem[],
): TherapyAssessmentPlanTabSchemaType => {
  const result = createEmptyFormValues()

  value?.forEach((item) => {
    if (item.sectionItem === 'patientDiscussionCompleted') {
      result.patientDiscussionCompleted = item.sectionItemValue as 'yes' | 'no'
    }
    if (item.sectionItem === 'assessmentTreatmentPlanNotes') {
      result.assessmentTreatmentPlanNotes = item.sectionItemValue
    }
  })

  return result as TherapyAssessmentPlanTabSchemaType
}

export { transformIn, transformOut }
