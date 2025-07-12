import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import { DateValue } from 'react-aria-components'
import { z } from 'zod'
import { INVALID_RANGE_ERROR, OUT_OF_RANGE_ERROR } from '../schedule/constants'
import { validateDate } from '../schedule/utils'
import { SecureMessagesTab } from './types'

type SchemaType = z.infer<typeof schema>

const schema = z
  .object({
    isIncludeMetadataResourceChangeControl: z.boolean().optional(),
    isIncludeMetadataResourceIds: z.boolean().optional(),
    isIncludeMetadataResourceStatus: z.boolean().optional(),
    from: z.custom<DateValue>().optional(),
    to: z.custom<DateValue>().optional(),
    sendMode: z.string().optional(),
    messageId: z.string().uuid().optional(),
    messageChannelId: z.string().uuid().optional(),
    externalMessageId: z.string().optional(),
    externalEmail: z.string().email().optional(),
    isIncludeChannels: z.boolean().optional(),
    isIncludeAttachments: z.boolean().optional(),
    messageStatus: z.nativeEnum(SecureMessagesTab).optional(),
    subject: z.string().optional(),
    userId: z.number().nonnegative().optional(),
    name: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    status: z.string().optional(),
    isReplied: z.boolean().optional(),
    isRead: z.boolean().optional(),
    isConversationalView: z.boolean().default(true),
    isConversationRequired: z.boolean().default(true),
  })
  .superRefine((data, ctx) => {
    const { from, to } = data

    if (from) {
      const validity = validateDate(from, to)
      if (validity > 0) {
        ctx.addIssue({
          path: ['from'],
          code: z.ZodIssueCode.custom,
          message: INVALID_RANGE_ERROR,
        })
      } else if (from.compare(new CalendarDate(2000, 1, 1)) < 0) {
        ctx.addIssue({
          path: ['from'],
          code: z.ZodIssueCode.custom,
          message: OUT_OF_RANGE_ERROR,
        })
      } else if (from.compare(today(getLocalTimeZone())) > 0) {
        ctx.addIssue({
          path: ['from'],
          code: z.ZodIssueCode.custom,
          message: 'Date cannot be in the future',
        })
      }
    }

    if (to) {
      const validity = validateDate(to, from)
      if (validity < 0) {
        ctx.addIssue({
          path: ['to'],
          code: z.ZodIssueCode.custom,
          message: INVALID_RANGE_ERROR,
        })
      } else if (to.compare(new CalendarDate(2000, 1, 1)) < 0) {
        ctx.addIssue({
          path: ['to'],
          code: z.ZodIssueCode.custom,
          message: OUT_OF_RANGE_ERROR,
        })
      } else if (to.compare(today(getLocalTimeZone())) > 0) {
        ctx.addIssue({
          path: ['to'],
          code: z.ZodIssueCode.custom,
          message: 'Date cannot be in the future',
        })
      }
    }
  })

export { schema, type SchemaType }
