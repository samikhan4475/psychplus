import { z } from 'zod'

type PastPsychHxWidgetSchemaType = z.infer<typeof pastPsychHxWidgetSchema>

const conditionalPositiveInt = z.coerce.number().optional()

const pastPsychHxWidgetSchema = z.object({
  widgetContainerCheckboxField: z.string().optional(),
  psychHospitalizations: z.coerce.number(),
  suicideAttempts: z.coerce.number(),
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
  panicAttacks: z.oboolean(),
  panicAttacksAge: conditionalPositiveInt,
  dementia: z.oboolean(),
  dementiaAge: conditionalPositiveInt,
  personalityDisorder: z.oboolean(),
  personalityDisorderAge: conditionalPositiveInt,
  intellectualDisability: z.oboolean(),
  intellectualDisabilityAge: conditionalPositiveInt,
  other: z.oboolean(),
  otherDetails: z
    .string()
    .max(500, 'Max 500 characters are allowed')
    .optional(),
})

export { pastPsychHxWidgetSchema, type PastPsychHxWidgetSchemaType }
