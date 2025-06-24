import { CalendarDate } from '@internationalized/date'
import { DateValue } from 'react-aria-components'
import z from 'zod'

const dateValidation = z
  .custom<DateValue | undefined | CalendarDate>()
  .refine((val) => val !== undefined, {
    message: 'Required',
  })

const schema = z.object({
  id: z.string().optional(),
  practiceId: z.string().optional(),
  insurancePlanId: z.string().min(1, { message: 'Required' }),
  effectiveDate: dateValidation,
  isRevalidationRequired: z.string().min(1, { message: 'Required' }),
  isProviderRevalidationRequired: z.string().min(1, { message: 'Required' }),
  revalidationDate: dateValidation,
  insurancePlanName: z.string().min(1, 'Required'),
  payerName: z.string().min(1, 'Required'),
  planStatus: z.string().min(1, 'Required'),
  planType: z.string().min(1, { message: 'Required' }),
  recordStatus: z.string().min(1, { message: 'Required' }),
  networkStatus: z.string().min(1, { message: 'Required' }),
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
