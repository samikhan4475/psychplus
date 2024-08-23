import { z } from 'zod'

type HpiWidgetSchemaType = z.infer<typeof hpiWidgetSchema>

const hpiWidgetSchema = z.object({
  chiefComplaint: z.array(z.string()),
  depression: z.array(z.string()),
  anxiety: z.array(z.string()),
  mania: z.array(z.string()),
  ptsd: z.array(z.string()),
  obsession: z.array(z.string()),
  bpd: z.array(z.string()),
  substance: z.array(z.string()),
  adhdInattentive: z.array(z.string()),
  adhdHyperactive: z.array(z.string()),
  dementia: z.array(z.string()),
  schizophrenia: z.array(z.string()),
  medicationSe: z.array(z.string()),
  other: z.string().trim(),
})

export { hpiWidgetSchema, type HpiWidgetSchemaType }
