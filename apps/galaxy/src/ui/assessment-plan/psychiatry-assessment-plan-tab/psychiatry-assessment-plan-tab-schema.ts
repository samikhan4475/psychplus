import { z } from 'zod'
import { ASSESSMENT_PLAN_ERROR_MESSAGE } from '../constants'

type PsychiatryAssessmentPlanTabData = {
  patientDiscussionCompleted: 'yes' | 'no'
  assessmentTreatmentPlanNotes: string
  safetyPlanningIntervention: boolean
  warningSigns?: string[]
  copingStrategies?: string[]
  restrictingAccess?: string[]
  warningSignsOtherDetails?: string
  copingStrategiesOtherDetails?: string
  restrictingAccessOtherDetails?: string
}

const validateSafetyPlanRelatedFields = (
  data: PsychiatryAssessmentPlanTabData,
  ctx: z.RefinementCtx,
) => {
  const safetyPlanFields = ['warningSigns', 'copingStrategies' ,'restrictingAccess'] as const;

  safetyPlanFields.forEach(( field ) => {
    const fieldValue = data[field as keyof PsychiatryAssessmentPlanTabData] as string[];
    if (!fieldValue?.length) {
      ctx.addIssue({
        path: [field],
        code: z.ZodIssueCode.custom,
        message: ""
      });
    }
  });
}

const validateOtherDetailsFields = (
  data: PsychiatryAssessmentPlanTabData,
  ctx: z.RefinementCtx,
) => {
  if (
    data.warningSigns?.includes('wsOther') &&
    !data.warningSignsOtherDetails?.trim()
  ) {
    ctx.addIssue({
      path: ['warningSignsOtherDetails'],
      code: z.ZodIssueCode.custom,
      message: 'Please specify other warning signs',
    })
  }

  if (
    data.copingStrategies?.includes('csOther') &&
    !data.copingStrategiesOtherDetails?.trim()
  ) {
    ctx.addIssue({
      path: ['copingStrategiesOtherDetails'],
      code: z.ZodIssueCode.custom,
      message: 'Please specify other coping strategies',
    })
  }

  if (
    data.restrictingAccess?.includes('raOther') &&
    !data.restrictingAccessOtherDetails?.trim()
  ) {
    ctx.addIssue({
      path: ['restrictingAccessOtherDetails'],
      code: z.ZodIssueCode.custom,
      message: 'Please specify other restricting access',
    })
  }
}

const psychiatryAssessmentPlanTabSchema = z
  .object({
    patientDiscussionCompleted: z.enum(['yes', 'no']),
    assessmentTreatmentPlanNotes: z
      .string()
      .min(30, ASSESSMENT_PLAN_ERROR_MESSAGE)
      .max(4000, 'Max 4000 characters are allowed'),
    safetyPlanningIntervention: z.boolean(),
    warningSigns: z.array(z.string()).optional(),
    copingStrategies: z.array(z.string()).optional(),
    restrictingAccess: z.array(z.string()).optional(),
    warningSignsOtherDetails: z
      .string()
      .trim()
      .max(500, 'Max 500 characters are allowed')
      .optional(),
    copingStrategiesOtherDetails: z
      .string()
      .trim()
      .max(500, 'Max 500 characters are allowed')
      .optional(),
    restrictingAccessOtherDetails: z
      .string()
      .trim()
      .max(500, 'Max 500 characters are allowed')
      .optional(),
  })
  .superRefine((data: PsychiatryAssessmentPlanTabData, ctx) => {
    if (data.safetyPlanningIntervention) {
      validateSafetyPlanRelatedFields(data, ctx)
      validateOtherDetailsFields(data, ctx)
    }
  })

type PsychiatryAssessmentPlanTabSchemaType = z.infer<
  typeof psychiatryAssessmentPlanTabSchema
>

export {
  psychiatryAssessmentPlanTabSchema,
  type PsychiatryAssessmentPlanTabSchemaType,
}
