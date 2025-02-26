import { z } from 'zod'

type HpiWidgetSchemaType = z.infer<typeof hpiWidgetSchema>

const hpiWidgetSchema = z.object({
  chiefComplaint: z.array(z.string()),
  depression: z.array(z.string()),
  anxiety: z.array(z.string()),
  bipolarMania: z.array(z.string()),
  ptsd: z.array(z.string()),
  obsession: z.array(z.string()),
  bpd: z.array(z.string()),
  ocd: z.array(z.string()),
  substance: z.array(z.string()),
  adhdInattentive: z.array(z.string()),
  adhdHyperactive: z.array(z.string()),
  autism: z.array(z.string()),
  conductDisorder: z.array(z.string()),
  dementia: z.array(z.string()),
  schizophreniaDelusionValues: z.array(z.string()).optional(),
  schizophreniaHallucinationsValues: z.array(z.string()).optional(),
  schizophrenia: z.array(z.string()),
  medicationSe: z.array(z.string()),
  ccOtherDetails: z
    .string()
    .trim()
    .max(500, 'Max 500 characters are allowed')
    .optional(),
  subOtherDetails: z
    .string()
    .trim()
    .max(500, 'Max 500 characters are allowed')
    .optional(),
  medOtherDetails: z
    .string()
    .trim()
    .max(500, 'Max 500 characters are allowed')
    .optional(),
  hpiOther: z
    .string()
    .trim()
    .max(4000, 'Max 4000 characters are allowed')
    .optional(),
})

export { hpiWidgetSchema, type HpiWidgetSchemaType }
