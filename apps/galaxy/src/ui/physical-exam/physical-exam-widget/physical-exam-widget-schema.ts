import { z } from 'zod'

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
  cneOtherDetails: z.string().trim(),
  gnOtherDetails: z.string().trim(),
  sknOtherDetails: z.string().trim(),
  hntOtherDetails: z.string().trim(),
  nkOtherDetails: z.string().trim(),
  lnOtherDetails: z.string().trim(),
  chsOtherDetails: z.string().trim(),
  cvsOtherDetails: z.string().trim(),
  lngOtherDetails: z.string().trim(),
  giOtherDetails: z.string().trim(),
  gynOtherDetails: z.string().trim(),
  guOtherDetails: z.string().trim(),
  cnsOtherDetails: z.string().trim(),
  msuOtherDetails: z.string().trim(),
  mutOtherDetails: z.string().trim(),
  psyOtherDetails: z.string().trim(),
  nutOtherDetails: z.string().trim(),
})

export { physicalExamWidgetSchema, type PhysicalExamWidgetSchemaType }
