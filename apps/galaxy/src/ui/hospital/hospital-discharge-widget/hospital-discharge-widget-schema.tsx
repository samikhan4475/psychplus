import { z } from 'zod'

type HospitalDischargeWidgetSchemaType = z.infer<
  typeof hospitalDischargeWidgetSchema
>

const hospitalDischargeWidgetSchema = z.object({
  antiPsychotics: z.string().trim(),
  antiPsychoticOptions: z.array(z.string()),
  strengths: z.array(z.string()),
  strengthsOtherDescription: z
    .string()
    .max(500, 'Max 500 characters are allowed'),
  liabilites: z.array(z.string()),
  liabilitesOtherDescription: z
    .string()
    .max(500, 'Max 500 characters are allowed'),
  hospitalCourse: z.string().trim(),
  physicalConditionWNL: z.string().trim(),
  physicalConditionDescription: z
    .string()
    .trim()
    .max(500, 'Max 500 characters are allowed'),
  ambulationWNL: z.string().trim(),
  ambulationWNLDescription: z
    .string()
    .trim()
    .max(500, 'Max 500 characters are allowed'),
  ableToPerformAdls: z.string().trim(),
  ableToPerformAdlsDescription: z
    .string()
    .trim()
    .max(500, 'Max 500 characters are allowed'),
  socialFunctioningWNL: z.string().trim(),
  socialFunctioningWNLDescription: z
    .string()
    .trim()
    .max(500, 'Max 500 characters are allowed'),
  activity: z.string().trim(),
  activityOtherDescription: z
    .string()
    .trim()
    .max(500, 'Max 500 characters are allowed'),
  diet: z.string().trim(),
  dietOtherDescription: z
    .string()
    .trim()
    .max(500, 'Max 500 characters are allowed'),
  dischargeType: z.string().trim(),
  dischargeTypeDescription: z
    .string()
    .trim()
    .max(500, 'Max 500 characters are allowed'),
  disposition: z.string().trim(),
  followUp: z.string().trim(),
  dischargeTimeSpent: z.string().trim(),
})

export { hospitalDischargeWidgetSchema, type HospitalDischargeWidgetSchemaType }
