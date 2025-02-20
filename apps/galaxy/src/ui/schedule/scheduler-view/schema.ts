import { CalendarDate } from '@internationalized/date'
import { DateValue } from 'react-aria-components'
import z from 'zod'
import { INVALID_RANGE_ERROR, OUT_OF_RANGE_ERROR } from '../constants'
import { validateDate } from '../utils'

const dateValidation = z.custom<DateValue>()
const arrayOfIdsValidation = z
  .array(z.string())
  .refine((value) => value.every((item) => typeof item === 'string'), {
    message: 'Array must be empty or contain only strings',
  })

const schema = z
  .object({
    startingDate: dateValidation.optional(),
    endingDate: dateValidation.optional(),
    stateIds: arrayOfIdsValidation,
    locationIds: arrayOfIdsValidation,
    serviceIds: arrayOfIdsValidation,
    staffIds: arrayOfIdsValidation,
    providerTypes: arrayOfIdsValidation,
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
    } else if (
      startingDate &&
      startingDate.compare(new CalendarDate(2000, 1, 1)) < 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: OUT_OF_RANGE_ERROR,
        path: ['startingDate'],
      })
    }
    if (isEndDateValid < 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: INVALID_RANGE_ERROR,
        path: ['endingDate'],
      })
    } else if (
      endingDate &&
      endingDate.compare(new CalendarDate(2000, 1, 1)) < 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: OUT_OF_RANGE_ERROR,
        path: ['endingDate'],
      })
    }
  })

export { schema }
