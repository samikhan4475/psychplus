import { z } from 'zod'

type PastPsychHxWidgetSchemaType = z.infer<typeof pastPsychHxWidgetSchema>

const conditionalPositiveInt = z.coerce.number().positive().int().optional()

const pastPsychHxWidgetSchema = z
  .object({
    psychHospitalizations: conditionalPositiveInt,
    suicideAttempts: conditionalPositiveInt,
    depression: z.oboolean(),
    depressionAge: conditionalPositiveInt,
    anxiety: z.oboolean(),
    anxietyAge: conditionalPositiveInt,
    schizophrenia: z.oboolean(),
    schizophreniaAge: conditionalPositiveInt,
    bipolar: z.oboolean(),
    bipolarAge: conditionalPositiveInt,
    disorder: z.oboolean(),
    disorderAge: conditionalPositiveInt,
    obsessiveThinking: z.oboolean(),
    obsessiveThinkingAge: conditionalPositiveInt,
    compulsiveBehavior: z.oboolean(),
    compulsiveBehaviorAge: conditionalPositiveInt,
    adhd: z.oboolean(),
    adhdAge: conditionalPositiveInt,
    autism: z.oboolean(),
    autismAge: conditionalPositiveInt,
    eatingDisorder: z.oboolean(),
    eatingDisorderAge: conditionalPositiveInt,
    exposureToTrauma: z.oboolean(),
    exposureToTraumaAge: conditionalPositiveInt,
    cuttingSelfHarmBehavior: z.oboolean(),
    cuttingSelfHarmBehaviorAge: conditionalPositiveInt,
    problemsWithSleep: z.oboolean(),
    problemsWithSleepAge: conditionalPositiveInt,
    dementia: z.oboolean(),
    dementiaAge: conditionalPositiveInt,
    personalityDisorder: z.oboolean(),
    personalityDisorderAge: conditionalPositiveInt,
    intellectualDisability: z.oboolean(),
    intellectualDisabilityAge: conditionalPositiveInt,
    other: z.oboolean(),
    otherDetails: z.ostring(),
  })
  .superRefine((data, ctx) => {
    if (data.depression && !data.depressionAge) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['depressionAge'],
        message: 'Required',
      })
    }

    if (data.anxiety && !data.anxietyAge) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['anxietyAge'],
        message: 'Required',
      })
    }

    if (data.schizophrenia && !data.schizophreniaAge) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['schizophreniaAge'],
        message: 'Required',
      })
    }

    if (data.bipolar && !data.bipolarAge) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['bipolarAge'],
        message: 'Required',
      })
    }
  })

export { pastPsychHxWidgetSchema, type PastPsychHxWidgetSchemaType }
