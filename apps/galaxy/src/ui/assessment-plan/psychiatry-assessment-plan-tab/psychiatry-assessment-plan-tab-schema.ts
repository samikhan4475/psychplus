import { z } from 'zod'
import { ASSESSMENT_PLAN_ERROR_MESSAGE } from '../constants'

type PsychiatryAssessmentPlanTabSchemaType = z.infer<
  typeof psychiatryAssessmentPlanTabSchema
>

const psychiatryAssessmentPlanTabSchema = z.object({
  patientDiscussionCompleted: z.enum(['yes', 'no']),
  assessmentTreatmentPlanNotes: z
    .string()
    .min(30, ASSESSMENT_PLAN_ERROR_MESSAGE)
    .max(4000, 'Max 4000 characters are allowed'),
})

export {
  psychiatryAssessmentPlanTabSchema,
  type PsychiatryAssessmentPlanTabSchemaType,
}
