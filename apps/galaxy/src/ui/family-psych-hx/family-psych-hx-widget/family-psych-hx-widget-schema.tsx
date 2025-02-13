import { z } from 'zod'

type FamilyPsychHxWidgetSchemaType = z.infer<typeof familyPsychHxWidgetSchema>

const booleanOptional = z.boolean().optional()
const stringOptional = z.string().optional()
const stringArray = z.array(z.string()).optional()

const familyPsychHxWidgetSchema = z.object({
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

export { familyPsychHxWidgetSchema, type FamilyPsychHxWidgetSchemaType }
