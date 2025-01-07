import { DateValue } from 'react-aria-components'
import z from 'zod'
import { INVALID_RANGE_ERROR } from '../constants'
import { validateDate } from '../utils'

const dateValidation = z.custom<DateValue>()

const schema = z
  .object({
    startingDate: dateValidation.optional(),
    endingDate: dateValidation.optional(),
    stateId: z.string().min(1, 'Required'),
    locationIds: z.string().optional(),
    serviceIds: z
      .array(z.string())
      .refine((value) => value.every((item) => typeof item === 'string'), {
        message: 'Array must be empty or contain only strings',
      }),
    staffIds: z.string().optional(),
    specialistTypeCode: z.string().optional(),
    gender: z.string().optional(),
    language: z.string().optional(),
    type: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { startingDate, endingDate } = data
    const isStartDateValid = startingDate
      ? validateDate(startingDate, endingDate)
      : 0
    const isEndDateValid = endingDate
      ? validateDate(endingDate, startingDate)
      : 0
    if (isStartDateValid > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: INVALID_RANGE_ERROR,
        path: ['startingDate'],
      })
    }
    if (isEndDateValid < 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: INVALID_RANGE_ERROR,
        path: ['endingDate'],
      })
    }
  })

export { schema }
