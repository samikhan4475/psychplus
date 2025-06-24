import { z } from 'zod'

type SafetyPlanningInterventionData = {
  widgetContainerCheckboxField?: string
  warningSigns?: string[]
  copingStrategies?: string[]
  restrictingAccess?: string[]
  warningSignsOtherDetails?: string
  copingStrategiesOtherDetails?: string
  restrictingAccessOtherDetails?: string
}

const validateSafetyPlanRelatedFields = (
  data: SafetyPlanningInterventionData,
  ctx: z.RefinementCtx,
) => {
  const safetyPlanFields = [
    'warningSigns',
    'copingStrategies',
    'restrictingAccess',
  ] as const

  safetyPlanFields.forEach((field) => {
    const fieldValue = data[
      field as keyof SafetyPlanningInterventionData
    ] as string[]
    if (!fieldValue?.length) {
      ctx.addIssue({
        path: [field],
        code: z.ZodIssueCode.custom,
        message: '',
      })
    }
  })
}

const validateOtherDetailsFields = (
  data: SafetyPlanningInterventionData,
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

const safetyPlanningInterventionSchema = z
  .object({
    widgetContainerCheckboxField: z.string().optional(),
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
  .superRefine((data: SafetyPlanningInterventionData, ctx) => {
    if (data.widgetContainerCheckboxField === 'show') {
      validateSafetyPlanRelatedFields(data, ctx)
      validateOtherDetailsFields(data, ctx)
    }
  })

type SafetyPlanningInterventionSchemaType = z.infer<
  typeof safetyPlanningInterventionSchema
>

export {
  safetyPlanningInterventionSchema,
  type SafetyPlanningInterventionSchemaType,
}
