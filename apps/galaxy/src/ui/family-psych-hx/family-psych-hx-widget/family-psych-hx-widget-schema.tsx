import { z } from 'zod'

type FamilyPsychHxWidgetSchemaType = z.infer<typeof familyPsychHxWidgetSchema>

const booleanOptional = z.boolean().optional()
const stringOptional = z.string().optional()
const stringArrayOptional = z.array(z.string()).optional()
const familyPsychHxWidgetSchema = z.object({
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
  other: stringOptional,
})

export { familyPsychHxWidgetSchema, type FamilyPsychHxWidgetSchemaType }
