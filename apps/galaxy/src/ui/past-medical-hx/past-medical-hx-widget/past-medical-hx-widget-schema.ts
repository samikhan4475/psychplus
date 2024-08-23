import { z } from 'zod'

type PastMedicalHxWidgetSchemaType = z.infer<typeof pastMedicalHxWidgetSchema>

const conditionalPositiveInt = z.coerce.number().positive().int().optional()

const pastMedicalHxWidgetSchema = z.object({
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

export { pastMedicalHxWidgetSchema, type PastMedicalHxWidgetSchemaType }
