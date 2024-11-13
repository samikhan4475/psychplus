import { z } from 'zod'

type TherapyAssessmentPlanTabSchemaType = z.infer<
  typeof therapyAssessmentPlanTabSchema
>

const therapyAssessmentPlanTabSchema = z.object({
  patientDiscussionCompleted: z.enum(['yes', 'no']),
  assessmentTreatmentPlanNotes: z.string().optional(),
})

export {
  therapyAssessmentPlanTabSchema,
  type TherapyAssessmentPlanTabSchemaType,
}
