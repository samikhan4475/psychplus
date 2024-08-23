import { z } from 'zod'

type CodesWidgetSchemaType = z.infer<typeof codesWidgetSchema>

const codesWidgetSchema = z
  .object({
    primaryCode: z.string(),
    modifier: z.array(z.string()),
    therapy: z.array(z.string()),
    questionnaire: z.array(z.string()),
    injection: z.array(z.string()),
    interactiveComplexity: z.array(z.string()),
    psychoanalysis: z.array(z.string()),
    tobaccoCessation: z.array(z.string()),
    alcoholSubstanceUse: z.array(z.string()),
    afterHours: z.array(z.string()),
  })


export { codesWidgetSchema, type CodesWidgetSchemaType }
