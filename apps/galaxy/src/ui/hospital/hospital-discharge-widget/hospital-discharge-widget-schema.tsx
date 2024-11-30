import { z } from 'zod'

type HospitalDischargeWidgetSchemaType = z.infer<
  typeof hospitalDischargeWidgetSchema
>

const hospitalDischargeWidgetSchema = z.object({
  antiPsychotics: z.string().trim(),
  antiPsychoticOptions: z.array(z.string()),
  strengths:  z.array(z.string()),
  strengthsOtherDescription: z.string(),
  liabilites:  z.array(z.string()),
  liabilitesOtherDescription: z.string(),
  hospitalCourse:  z.string().trim(),
  physicalConditionWNL: z.string().trim(),
  physicalConditionDescription: z.string().trim(),
  ambulationWNL:  z.string().trim(),
  ambulationWNLDescription: z.string().trim(),
  ableToPerformAdls:  z.string().trim(),
  ableToPerformAdlsDescription: z.string().trim(),
  socialFunctioningWNL: z.string().trim(),
  socialFunctioningWNLDescription: z.string().trim(),
  activity: z.string().trim(),
  activityOtherDescription: z.string().trim(),
  diet: z.string().trim(),
  dietOtherDescription: z.string().trim(),
  dischargeType: z.string().trim(),
  dischargeTypeDescription: z.string().trim(),
  disposition: z.string().trim(),
  followUp: z.string().trim(),
  dischargeTimeSpent: z.string().trim(),
})

export { hospitalDischargeWidgetSchema, type HospitalDischargeWidgetSchemaType }
