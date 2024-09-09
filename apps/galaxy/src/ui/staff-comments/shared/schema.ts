import { DateValue } from 'react-aria-components'
import z from 'zod'

const filterFormDefaultValues = {
  dateFrom: null,
  dateTo: null,
  staff: '',
  text: '',
}

const commentSchema = z.object({
  from: z.number(),
  to: z.string(),
  staff: z.string(),
  comment: z.string(),
})

const filterFormschema = z.object({
  dateFrom: z.custom<DateValue | null>(),
  dateTo: z.custom<DateValue | null>(),
  staff: z.string(),
  text: z.string(),
})

type FilterFormSchemaType = z.infer<typeof filterFormschema>

type CommentSchemaType = z.infer<typeof commentSchema>

export {
  commentSchema,
  filterFormschema,
  filterFormDefaultValues,
  type CommentSchemaType,
  type FilterFormSchemaType,
}
