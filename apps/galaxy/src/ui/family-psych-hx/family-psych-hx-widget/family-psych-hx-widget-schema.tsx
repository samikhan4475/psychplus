import { z } from 'zod'

type FamilyPsychHxWidgetSchemaType = z.infer<typeof familyPsychHxWidgetSchema>

const familyPsychHxWidgetSchema = z
  .object({
    completedSuicide: z.oboolean(),
    completedSuicideRelation: z.ostring(),
    anxiety: z.oboolean(),
    anxietyRelation: z.ostring(),
    depression: z.oboolean(),
    depressionRelation: z.ostring(),
    ocd: z.oboolean(),
    ocdRelation: z.ostring(),
    bipolarDisorder: z.oboolean(),
    bipolarDisorderRelation: z.ostring(),
    schizophrenia: z.oboolean(),
    schizophreniaRelation: z.ostring(),
    alcoholUseDisorder: z.oboolean(),
    alcoholUseDisorderRelation: z.ostring(),
    dementia: z.oboolean(),
    dementiaRelation: z.ostring(),
  })
  .superRefine((data, ctx) => {
    if (data.completedSuicide && !data.completedSuicideRelation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['completedSuicide'],
        message: 'Required',
      })
    }
  })

export { familyPsychHxWidgetSchema, type FamilyPsychHxWidgetSchemaType }
