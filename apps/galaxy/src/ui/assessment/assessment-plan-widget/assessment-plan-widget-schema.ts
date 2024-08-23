import { z } from 'zod'

type AssessmentPlanWidgetSchemaType = z.infer<typeof assessmentPlanWidgetSchema>

const assessmentPlanWidgetSchema = z.object({
  assessmentPlan: z.ostring(),
})

export { assessmentPlanWidgetSchema, type AssessmentPlanWidgetSchemaType }
