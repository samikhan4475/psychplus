import { DateValue, TimeValue } from 'react-aria-components'
import z from 'zod'
import { isValidDateRange } from '@/utils'

const dateValidation = z
  .custom<DateValue>()
  .refine((val) => val !== undefined, {
    message: 'Required',
  })

const singleAllergySchema = z
  .object({
    allergyName: z.string(),
    allergyType: z.string(),
    severityCode: z.string().optional(),
    reactionId: z.string().optional(),
    status: z.string().optional(),
    startDate: dateValidation,
    endDate: z.custom<DateValue>().optional(),
    startTime: z.custom<TimeValue>().optional(),
    endTime: z.custom<TimeValue>().optional(),
    comment: z.string().optional(),
    allergyId: z.number().optional(),
  })
  .refine((data) => isValidDateRange(data.startDate, data.endDate ?? null), {
    message: 'End date cannot be earlier than start date',
    path: ['endDate'],
  })

const schema = z.object({
  allergies: z.array(singleAllergySchema).min(1),
})

type AddAllergySchemaType = z.infer<typeof schema>
type SingleAllergySchemaType = z.infer<typeof singleAllergySchema>

export { schema, singleAllergySchema }
export type { AddAllergySchemaType, SingleAllergySchemaType }
