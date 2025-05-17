import { DateValue, TimeValue } from 'react-aria-components'
import z from 'zod'

const dateValidation = z
  .custom<DateValue>()
  .refine((val) => val !== undefined, {
    message: 'Required',
  })

const singleAllergySchema = z.object({
  allergyName: z.string(),
  allergyType: z.string(),
  severityCode: z.string(),
  reactionId: z.string(),
  status: z.string(),
  startDate: dateValidation,
  endDate: dateValidation,
  startTime: z.custom<TimeValue>().refine((val) => val !== undefined, {
    message: 'Required',
  }),
  endTime: z.custom<TimeValue>(),
  comment: z.string().optional(),
  allergyId: z.number().optional(),
})

const schema = z.object({
  allergies: z.array(singleAllergySchema).min(1),
})

type AddAllergySchemaType = z.infer<typeof schema>
type SingleAllergySchemaType = z.infer<typeof singleAllergySchema>

export { schema, singleAllergySchema }
export type { AddAllergySchemaType, SingleAllergySchemaType }
