import { z } from 'zod'

const limitedStringSchema = z
  .string()
  .trim()
  .max(30, 'Max 30 characters are allowed.')

type PhysicalExamWidgetSchemaType = z.infer<typeof physicalExamWidgetSchema>

const physicalExamWidgetSchema = z.object({
  general: z.array(z.string()),
  skin: z.array(z.string()),
  heent: z.array(z.string()),
  neck: z.array(z.string()),
  lymphNodes: z.array(z.string()),
  chest: z.array(z.string()),
  cardiovascularCvs: z.array(z.string()),
  lungs: z.array(z.string()),
  gastrointestinalGi: z.array(z.string()),
  adhdHyperactive: z.array(z.string()),
  gynecologicalGyn: z.array(z.string()),
  genitourinaryGu: z.array(z.string()),
  centralNervousSystemCns: z.array(z.string()),
  musculoskeletal: z.array(z.string()),
  nutrition: z.array(z.string()),
  psychiatric: z.array(z.string()),
  cranialNervesExam: z.array(z.string()),
  cneOtherDetails: limitedStringSchema,
  gnOtherDetails: limitedStringSchema,
  sknOtherDetails: limitedStringSchema,
  hntOtherDetails: limitedStringSchema,
  nkOtherDetails: limitedStringSchema,
  lnOtherDetails: limitedStringSchema,
  chsOtherDetails: limitedStringSchema,
  cvsOtherDetails: limitedStringSchema,
  lngOtherDetails: limitedStringSchema,
  giOtherDetails: limitedStringSchema,
  gynOtherDetails: limitedStringSchema,
  guOtherDetails: limitedStringSchema,
  cnsOtherDetails: limitedStringSchema,
  msuOtherDetails: limitedStringSchema,
  mutOtherDetails: limitedStringSchema,
  psyOtherDetails: limitedStringSchema,
  nutOtherDetails: limitedStringSchema,
})

export { physicalExamWidgetSchema, type PhysicalExamWidgetSchemaType }
