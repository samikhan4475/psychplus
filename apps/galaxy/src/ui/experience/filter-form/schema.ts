import { DateValue } from 'react-aria-components'
import z from 'zod'

const experienceSchema = z.object({
  fromDateTime: z.custom<null | DateValue>().optional(),
  toDateTime: z.custom<null | DateValue>().optional(),
  patientFirstName: z.string().trim().optional(),
  patientLastName: z.string().trim().optional(),
  age: z.string().optional(),
  gender: z.enum(['Male', 'Female', 'Undetermined']).optional(),
  dateOfBirth: z.custom<null | DateValue>().optional(),
  locationId: z.string().optional(),
  visitType: z.string().optional(),
  insurance: z.string().optional(),
  payerPlanIds: z.array(z.string()),
  rating: z.string().optional(),
  appointmentRatingReason: z.string().optional(),
  comment: z.string().optional(),
})

type ExperienceSchemaType = z.infer<typeof experienceSchema>

export { experienceSchema, type ExperienceSchemaType }
