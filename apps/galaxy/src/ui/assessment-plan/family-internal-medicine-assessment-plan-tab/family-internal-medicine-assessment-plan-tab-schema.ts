import { z } from 'zod'
import { ASSESSMENT_PLAN_ERROR_MESSAGE } from '../constants'

type FamilyInternalMedicineAssessmentPlanTabSchemaType = z.infer<
  typeof familyInternalMedicineAssessmentPlanTabSchema
>

const familyInternalMedicineAssessmentPlanTabSchema = z.object({
  patientDiscussionCompleted: z.enum(['yes', 'no']),
  assessmentTreatmentPlanNotes: z
    .string()
    .min(30, ASSESSMENT_PLAN_ERROR_MESSAGE),
})

export {
  familyInternalMedicineAssessmentPlanTabSchema,
  type FamilyInternalMedicineAssessmentPlanTabSchemaType,
}
