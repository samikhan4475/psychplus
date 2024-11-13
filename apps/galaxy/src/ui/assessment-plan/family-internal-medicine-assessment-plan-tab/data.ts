import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import { createEmptyFormValues } from './family-internal-medicine-assessment-plan-defaults'
import { FamilyInternalMedicineAssessmentPlanTabSchemaType } from './family-internal-medicine-assessment-plan-tab-schema'

const transformOut =
  (patientId: string) =>
  (
    schema: FamilyInternalMedicineAssessmentPlanTabSchemaType,
  ): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []
    const data = sanitizeFormData(schema)
    Object.entries(data).forEach(([key, value]) => {
      result.push({
        pid: Number(patientId),
        sectionName:
          QuickNoteSectionName.QuicknoteSectionFamilyInternalMedicineAssessmentPlan,
        sectionItem: key,
        sectionItemValue: value as string,
      })
    })
    return result
  }

const transformIn = (
  value: QuickNoteSectionItem[],
): FamilyInternalMedicineAssessmentPlanTabSchemaType => {
  const result = createEmptyFormValues()

  value?.forEach((item) => {
    if (item.sectionItem === 'patientDiscussionCompleted') {
      result.patientDiscussionCompleted = item.sectionItemValue as 'yes' | 'no'
    }
    if (item.sectionItem === 'assessmentTreatmentPlanNotes') {
      result.assessmentTreatmentPlanNotes = item.sectionItemValue
    }
  })

  return result as FamilyInternalMedicineAssessmentPlanTabSchemaType
}

export { transformIn, transformOut }
