import z from 'zod'

const booleanOptional = z.boolean().optional()
const stringArrayOptional = z.array(z.string()).optional()

const familyPsychHxSchema = z.object({
  widgetContainerCheckboxField: z.string().optional(),
  depression: booleanOptional,
  depressionRelation: stringArrayOptional,
  anxiety: booleanOptional,
  anxietyRelation: stringArrayOptional,
  completedSuicide: booleanOptional,
  completedSuicideRelation: stringArrayOptional,
  schizophrenia: booleanOptional,
  schizophreniaRelation: stringArrayOptional,
  ocd: booleanOptional,
  ocdRelation: stringArrayOptional,
  bipolarDisorder: booleanOptional,
  bipolarDisorderRelation: stringArrayOptional,
  alcoholUseDisorder: booleanOptional,
  alcoholUseDisorderRelation: stringArrayOptional,
  dementia: booleanOptional,
  dementiaRelation: stringArrayOptional,
  other: z.string().max(4000, 'Max 4000 characters are allowed').optional(),
})

type FamilyPsychHxSchemaType = z.infer<typeof familyPsychHxSchema>

export { familyPsychHxSchema, type FamilyPsychHxSchemaType }
