import { z } from 'zod'

type HpiWidgetSchemaType = z.infer<typeof hpiWidgetSchema>

const hpiWidgetSchema = z
  .object({
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
      .max(30, 'Max 30 characters allowed')
      .optional(),
    subOtherDetails: z
      .string()
      .trim()
      .max(30, 'Max 30 characters allowed')
      .optional(),
    medOtherDetails: z
      .string()
      .trim()
      .max(30, 'Max 30 characters allowed')
      .optional(),
    hpiOther: z
      .string()
      .trim()
      .max(128, 'Max 128 characters allowed')
      .optional(),
  })
  .superRefine((data, ctx) => {
    const issues = [
      {
        condition: 'ccOther',
        field: 'chiefComplaint',
        requiredField: 'ccOtherDetails',
      },
      {
        condition: 'subOther',
        field: 'substance',
        requiredField: 'subOtherDetails',
      },
      {
        condition: 'medOther',
        field: 'substance',
        requiredField: 'medOtherDetails',
      },
      {
        condition: 'medOther',
        field: 'medicationSe',
        requiredField: 'medOtherDetails',
      },
      {
        condition: 'schDelusion',
        field: 'schizophrenia',
        requiredField: 'schizophreniaDelusionValues',
      },
      {
        condition: 'schHallucination',
        field: 'schizophrenia',
        requiredField: 'schizophreniaHallucinationsValues',
      },
    ]

    issues.forEach(({ condition, field, requiredField }) => {
      const fieldValue = data[field as keyof typeof data]
      const requiredValue = data[requiredField as keyof typeof data]
      if (fieldValue?.includes(condition) && !requiredValue?.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [requiredField],
          message: `Required`,
        })
      }
    })
  })

export { hpiWidgetSchema, type HpiWidgetSchemaType }
