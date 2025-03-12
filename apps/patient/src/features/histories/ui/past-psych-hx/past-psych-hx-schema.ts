import { z } from 'zod'

type PastPsychHxSchemaType = z.infer<typeof pastPsychHxSchema>
const conditionalPositiveInt = z.coerce.number().optional()
const pastPsychHxSchema = z.object({
  widgetContainerCheckboxField: z.string().optional(),
  psychHospitalizations: z.coerce.number(),
  suicideAttempts: z.coerce.number(),
  depression: z.oboolean(),
  depressionAge: conditionalPositiveInt,
  schizophreniaAge: conditionalPositiveInt,
  anxiety: z.oboolean(),
  anxietyAge: conditionalPositiveInt,
  disorder: z.oboolean(),
  schizophrenia: z.oboolean(),
  bipolar: z.oboolean(),
  bipolarAge: conditionalPositiveInt,
  compulsiveBehavior: z.oboolean(),
  disorderAge: conditionalPositiveInt,
  adhd: z.oboolean(),
  obsessiveThinking: z.oboolean(),
  autism: z.oboolean(),
  obsessiveThinkingAge: conditionalPositiveInt,
  eatingDisorder: z.oboolean(),
  compulsiveBehaviorAge: conditionalPositiveInt,
  exposureToTraumaAge: conditionalPositiveInt,
  adhdAge: conditionalPositiveInt,
  autismAge: conditionalPositiveInt,
  panicAttacksAge: conditionalPositiveInt,
  eatingDisorderAge: conditionalPositiveInt,
  problemsWithSleepAge: conditionalPositiveInt,
  exposureToTrauma: z.oboolean(),
  panicAttacks: z.oboolean(),
  problemsWithSleep: z.oboolean(),
  personalityDisorder: z.oboolean(),
  dementiaAge: conditionalPositiveInt,
  dementia: z.oboolean(),
  intellectualDisability: z.oboolean(),
  intellectualDisabilityAge: conditionalPositiveInt,
  other: z.oboolean(),
  personalityDisorderAge: conditionalPositiveInt,
  otherDetails: z
  .string()
    .max(500, 'Max 500 characters are allowed')
    .optional(),
})


export { pastPsychHxSchema, type PastPsychHxSchemaType }
