import { z } from 'zod'


const hospitalInitialWidgetSchema = z.object({
  strengths: z.array(z.string()).min(2,"Required"),
  liabilities: z.array(z.string()).min(2,"Required"),
  needForLevelOfCare: z.array(z.string()).min(1,"Please Select atleast one option"),
  shortTermGoals: z.array(z.string()).min(1,"Required"),
  precautions: z.array(z.string()),
  dcPlan: z.array(z.string()).min(1,"Required"),
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
type HospitalInitialWidgetSchemaType = z.infer< typeof hospitalInitialWidgetSchema>

export { hospitalInitialWidgetSchema, type HospitalInitialWidgetSchemaType }
