import { z } from 'zod'

type PsychiatryAssessmentPlanTabSchemaType = z.infer<
  typeof psychiatryAssessmentPlanTabSchema
>

const psychiatryAssessmentPlanTabSchema = z.object({
  patientDiscussionCompleted: z.enum(['yes', 'no']),
  assessmentTreatmentPlanNotes: z.string().optional(),
})

export {
  psychiatryAssessmentPlanTabSchema,
  type PsychiatryAssessmentPlanTabSchemaType,
}
