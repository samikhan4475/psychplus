import { z } from 'zod'
import { ASSESSMENT_PLAN_ERROR_MESSAGE } from '../constants'

type TherapyAssessmentPlanTabSchemaType = z.infer<
  typeof therapyAssessmentPlanTabSchema
>

const therapyAssessmentPlanTabSchema = z.object({
  patientDiscussionCompleted: z.enum(['yes', 'no']),
  assessmentTreatmentPlanNotes: z
    .string()
    .min(30, ASSESSMENT_PLAN_ERROR_MESSAGE),
})

export {
  therapyAssessmentPlanTabSchema,
  type TherapyAssessmentPlanTabSchemaType,
}
