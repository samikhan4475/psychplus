import { DateValue } from 'react-aria-components'
import { z } from 'zod'
import { SecureMessagesTab } from './types'

type SchemaType = z.infer<typeof schema>

const schema = z.object({
  isIncludeMetadataResourceChangeControl: z.boolean().optional(),
  isIncludeMetadataResourceIds: z.boolean().optional(),
  isIncludeMetadataResourceStatus: z.boolean().optional(),
  from: z.union([z.string(), z.null(), z.custom<DateValue>()]).optional(),
  to: z.union([z.string(), z.null(), z.custom<DateValue>()]).optional(),
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
})

export { schema, type SchemaType }
