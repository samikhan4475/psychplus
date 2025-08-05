import { z } from 'zod'
import { HPIVALIDATIONMESSAGE, requiredFields } from './utils'

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
    autismIntellectualImpairmentValue: z.string().optional(),
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
    depOtherDetails: z
      .string()
      .trim()
      .max(500, 'Max 500 characters are allowed')
      .optional(),
    anxOtherDetails: z
      .string()
      .trim()
      .max(500, 'Max 500 characters are allowed')
      .optional(),
    manOtherDetails: z
      .string()
      .trim()
      .max(500, 'Max 500 characters are allowed')
      .optional(),
    ptsOtherDetails: z
      .string()
      .trim()
      .max(500, 'Max 500 characters are allowed')
      .optional(),
    obsOtherDetails: z
      .string()
      .trim()
      .max(500, 'Max 500 characters are allowed')
      .optional(),
    bpdOtherDetails: z
      .string()
      .trim()
      .max(500, 'Max 500 characters are allowed')
      .optional(),
    adiOtherDetails: z
      .string()
      .trim()
      .max(500, 'Max 500 characters are allowed')
      .optional(),
    adhdhOtherDetails: z
      .string()
      .trim()
      .max(500, 'Max 500 characters are allowed')
      .optional(),
    autOtherDetails: z
      .string()
      .trim()
      .max(500, 'Max 500 characters are allowed')
      .optional(),
    cdOtherDetails: z
      .string()
      .trim()
      .max(500, 'Max 500 characters are allowed')
      .optional(),
    demOtherDetails: z
      .string()
      .trim()
      .max(500, 'Max 500 characters are allowed')
      .optional(),
    schOtherDetails: z
      .string()
      .trim()
      .max(500, 'Max 500 characters are allowed')
      .optional(),
  })
  .superRefine((data, ctx) => {
    const totalSymptoms = requiredFields
      .map((field) => data[field]?.length || 0)
      .reduce((sum, count) => sum + count, 0)

    if (totalSymptoms < 3 && (data?.hpiOther?.length || 0) < 30) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['chiefComplaint'],
        message: 'Required',
      })

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['hpiOther'],
        message: HPIVALIDATIONMESSAGE,
      })
    }
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
      {
        condition: 'depOther',
        field: 'depression',
        requiredField: 'depOtherDetails',
      },
      {
        condition: 'anxOther',
        field: 'anxiety',
        requiredField: 'anxOtherDetails',
      },
      {
        condition: 'manOther',
        field: 'bipolarMania',
        requiredField: 'manOtherDetails',
      },
      {
        condition: 'ptsOther',
        field: 'ptsd',
        requiredField: 'ptsOtherDetails',
      },
      {
        condition: 'obsOther',
        field: 'obsession',
        requiredField: 'obsOtherDetails',
      },
      {
        condition: 'bpdOther',
        field: 'bpd',
        requiredField: 'bpdOtherDetails',
      },
      {
        condition: 'adiOther',
        field: 'adhdInattentive',
        requiredField: 'adiOtherDetails',
      },
      {
        condition: 'adhdhOther',
        field: 'adhdHyperactive',
        requiredField: 'adhdhOtherDetails',
      },
      {
        condition: 'autOther',
        field: 'autism',
        requiredField: 'autOtherDetails',
      },
      {
        condition: 'cdOther',
        field: 'conductDisorder',
        requiredField: 'cdOtherDetails',
      },
      {
        condition: 'demOther',
        field: 'dementia',
        requiredField: 'demOtherDetails',
      },
      {
        condition: 'schOther',
        field: 'schizophrenia',
        requiredField: 'schOtherDetails',
      },
      {
        condition: 'autIntellectualImpairment',
        field: 'autism',
        requiredField: 'autismIntellectualImpairmentValue',
      },
    ]

    issues.forEach(({ condition, field, requiredField }) => {
      if (data[condition as keyof typeof data]?.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [requiredField],
          message: 'Select at least one symptom',
        })
      }

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
