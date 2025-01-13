import { TimeValue, type DateValue } from 'react-aria-components'
import z from 'zod'

const createNoteSchema = z.object({
  date: z.custom<DateValue>().refine((val) => val !== undefined, {
    message: 'Required',
  }),
  time: z.custom<TimeValue>().refine((val) => val !== undefined, {
    message: 'Required',
  }),
  noteTypeCode: z.string().trim().min(1, 'Required'),
  noteTitleCode: z.string().trim().optional(),
  provider: z.string().trim().min(1, 'Required'),
  cosigner: z.string().optional(),
  description: z.string().trim().min(1, 'Required'),
  file: z.array(z.instanceof(File)).optional(),
})

type CreateNoteSchema = z.infer<typeof createNoteSchema>

export { createNoteSchema, type CreateNoteSchema }
