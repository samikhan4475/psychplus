import { z } from 'zod'

type FamilyPsychHxWidgetSchemaType = z.infer<typeof familyPsychHxWidgetSchema>

const booleanOptional = z.boolean().optional()
const stringOptional = z.string().optional()
const stringArray = z.array(z.string()).optional()

const familyPsychHxWidgetSchema = z
  .object({
    widgetContainerCheckboxField: z.string().optional(),
    depression: booleanOptional,
    depressionRelation: stringArray,
    anxiety: booleanOptional,
    anxietyRelation: stringArray,
    completedSuicide: booleanOptional,
    completedSuicideRelation: stringArray,
    schizophrenia: booleanOptional,
    schizophreniaRelation: stringArray,
    ocd: booleanOptional,
    ocdRelation: stringArray,
    bipolarDisorder: booleanOptional,
    bipolarDisorderRelation: stringArray,
    alcoholUseDisorder: booleanOptional,
    alcoholUseDisorderRelation: stringArray,
    dementia: booleanOptional,
    dementiaRelation: stringArray,
    other: z.string().max(4000, 'Max 4000 characters are allowed').optional(),
  })
  .superRefine((data, ctx) => {
    const issues = [
      { condition: 'depression', relationField: 'depressionRelation' },
      { condition: 'anxiety', relationField: 'anxietyRelation' },
      {
        condition: 'completedSuicide',
        relationField: 'completedSuicideRelation',
      },
      { condition: 'schizophrenia', relationField: 'schizophreniaRelation' },
      { condition: 'ocd', relationField: 'ocdRelation' },
      {
        condition: 'bipolarDisorder',
        relationField: 'bipolarDisorderRelation',
      },
      {
        condition: 'alcoholUseDisorder',
        relationField: 'alcoholUseDisorderRelation',
      },
      { condition: 'dementia', relationField: 'dementiaRelation' },
    ]

    issues.forEach(({ condition, relationField }) => {
      const conditionValue = data[condition as keyof typeof data]
      const relationValue = data[relationField as keyof typeof data]

      if (
        conditionValue &&
        Array.isArray(relationValue) &&
        relationValue?.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [relationField],
          message: 'Required',
        })
      }
    })
  })

export { familyPsychHxWidgetSchema, type FamilyPsychHxWidgetSchemaType }
