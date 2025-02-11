import { z } from 'zod'

type HospitalInitialWidgetSchemaType = z.infer<
  typeof hospitalInitialWidgetSchema
>

const hospitalInitialWidgetSchema = z.object({
  strengths: z.array(z.string()),
  liabilities: z.array(z.string()),
  needForLevelOfCare: z.array(z.string()),
  shortTermGoals: z.array(z.string()),
  precautions: z.array(z.string()),
  dcPlan: z.array(z.string()),
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

export { hospitalInitialWidgetSchema, type HospitalInitialWidgetSchemaType }
