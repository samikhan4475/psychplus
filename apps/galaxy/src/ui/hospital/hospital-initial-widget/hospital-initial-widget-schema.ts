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
  strengthsOtherDetails: z.string().trim(),
  liabilitiesOtherDetails: z.string().trim(),
  stgOtherDetails: z.string().trim(),
  precautionsOtherDetails: z.string().trim(),
  dcplanOtherDetails: z.string().trim(),
})

export { hospitalInitialWidgetSchema, type HospitalInitialWidgetSchemaType }
