'use client'

import { DateValue } from 'react-aria-components'
import z from 'zod'

const commentSchema = z.object({
  comment: z
    .string()
    .min(1, 'Required')
    .max(128, 'Max 128 characters are allowed.'), // Max 128 characters
})

const filterFormschema = z.object({
  startDate: z.custom<DateValue | null>().optional(),
  endDate: z.custom<DateValue | null>().optional(),
  partialComment: z.string().optional(),
  isBilling: z.boolean(),
  isTreatment: z.boolean(),
  staffId: z.string().optional(),
})

type FilterFormSchemaType = z.infer<typeof filterFormschema>

type CommentSchemaType = z.infer<typeof commentSchema>

export {
  commentSchema,
  filterFormschema,
  type CommentSchemaType,
  type FilterFormSchemaType,
}
