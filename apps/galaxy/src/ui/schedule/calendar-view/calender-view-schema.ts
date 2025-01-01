import { DateValue } from 'react-aria-components'
import { z } from 'zod'

const dateValidation = z.custom<DateValue>()

const calenderViewSchema = z.object({
  startingDate: dateValidation.optional(),
  endingDate: dateValidation.optional(),
  stateIds: z.string().min(1, 'Required'),
  locationId: z.string().optional(),
  serviceIds: z
    .array(z.string())
    .refine((value) => value.every((item) => typeof item === 'string'), {
      message: 'Array must be empty or contain only strings',
    }),
  providerIds: z.string().optional(),
  visitMedium: z.string().optional(),
  providerType: z.string().optional(),
  gender: z.string().optional(),
  providerLanguage: z.string().optional(),
})

export { calenderViewSchema }
