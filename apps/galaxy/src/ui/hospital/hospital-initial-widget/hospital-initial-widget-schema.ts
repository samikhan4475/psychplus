import { z } from 'zod'

const hospitalInitialWidgetSchema = z.object({
  strengths: z
    .array(z.string())
    .min(2, 'Minimum 2 options must be selected for Strengths section'),
  liabilities: z
    .array(z.string())
    .min(2, 'Minimum 2 options must be selected for Liabilities section'),
  needForLevelOfCare: z
    .array(z.string())
    .min(
      1,
      'At least 1 option must be selected for Need for level of care section',
    ),
  shortTermGoals: z
    .array(z.string())
    .min(1, 'At least 1 option must be selected for Short Term Goals section'),
  precautions: z.array(z.string()),
  dcPlan: z
    .array(z.string())
    .min(1, 'At least 1 option must be selected for DC Plan section'),
  strengthsOtherDetails: z
    .string()
    .trim()
    .max(500, 'Max 500 characters are allowed'),
  liabilitiesOtherDetails: z
    .string()
    .trim()
    .max(500, 'Max 500 characters are allowed'),
  stgOtherDetails: z.string().trim().max(500, 'Max 500 characters are allowed'),
  precautionsOtherDetails: z
    .string()
  .trim()
    .max(500, 'Max 500 characters are allowed'),
  dcplanOtherDetails: z
    .string()
    .trim()
    .max(500, 'Max 500 characters are allowed'),
})
type HospitalInitialWidgetSchemaType = z.infer<
  typeof hospitalInitialWidgetSchema
>

export { hospitalInitialWidgetSchema, type HospitalInitialWidgetSchemaType }
