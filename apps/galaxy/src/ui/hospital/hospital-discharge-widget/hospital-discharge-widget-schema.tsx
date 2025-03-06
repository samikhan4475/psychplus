import { z } from 'zod'

type HospitalDischargeWidgetSchemaType = z.infer<
  typeof hospitalDischargeWidgetSchema
>

const hospitalDischargeWidgetSchema = z.object({
  antiPsychotics: z.string().trim().min(1,"Required"),
  antiPsychoticOptions: z.array(z.string()),
  strengths: z.array(z.string()).min(2,"Required"),
  strengthsOtherDescription: z
    .string()
    .max(500, 'Max 500 characters are allowed'),
  liabilites: z.array(z.string()).min(2,"Required"),
  liabilitesOtherDescription: z
    .string()
    .max(500, 'Max 500 characters are allowed'),
  hospitalCourse: z.string().trim().min(1,"Required"),
  physicalConditionWNL: z.string().trim().min(1,"Required"),
  physicalConditionDescription: z
    .string()
    .trim()
    .max(500, 'Max 500 characters are allowed'),
  ambulationWNL: z.string().trim().min(1,"Required"),
  ambulationWNLDescription: z
    .string()
    .trim()
    .max(500, 'Max 500 characters are allowed'),
  ableToPerformAdls: z.string().trim().min(1,"Required"),
  ableToPerformAdlsDescription: z
    .string()
    .trim()
    .max(500, 'Max 500 characters are allowed'),
  socialFunctioningWNL: z.string().trim().min(1,"Required"),
  socialFunctioningWNLDescription: z
    .string()
    .trim()
    .max(500, 'Max 500 characters are allowed'),
  activity: z.string().trim().min(1,"Required"),
  activityOtherDescription: z
    .string()
    .trim()
    .max(500, 'Max 500 characters are allowed'),
  diet: z.string().trim().min(1,"Required"),
  dietOtherDescription: z
    .string()
    .trim()
    .max(500, 'Max 500 characters are allowed'),
  dischargeType: z.string().trim().min(1,"Required"),
  dischargeTypeDescription: z
    .string()
    .trim()
    .max(500, 'Max 500 characters are allowed'),
  disposition: z.string().trim().min(1,"Required"),
  followUp: z.string().trim(),
  dischargeTimeSpent: z.string().trim().min(1,"Required"),
})

export { hospitalDischargeWidgetSchema, type HospitalDischargeWidgetSchemaType }
