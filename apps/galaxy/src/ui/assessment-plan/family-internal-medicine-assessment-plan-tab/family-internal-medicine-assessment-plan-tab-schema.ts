import { z } from 'zod'

type FamilyInternalMedicineAssessmentPlanTabSchemaType = z.infer<
  typeof familyInternalMedicineAssessmentPlanTabSchema
>

const familyInternalMedicineAssessmentPlanTabSchema = z.object({
  patientDiscussionCompleted: z.enum(['yes', 'no']),
  assessmentTreatmentPlanNotes: z.string().optional(),
})

export {
  familyInternalMedicineAssessmentPlanTabSchema,
  type FamilyInternalMedicineAssessmentPlanTabSchemaType,
}
