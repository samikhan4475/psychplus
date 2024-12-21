import { type DateValue } from 'react-aria-components'
import z from 'zod'

const createNoteSchema = z.object({
  date: z.custom<DateValue>().optional(),
  time: z.string().trim().optional(),
  noteTypeCode: z.string().trim().min(1, 'Required'),
  noteTitleCode: z.string().trim().optional(),
  provider: z.string().trim().min(1, 'Required'),
  cosigner: z.string().trim().min(1, 'Required'),
  description: z.string().trim().min(1, 'Required'),
  file: z.array(z.instanceof(File)).optional(),
})

type CreateNoteSchema = z.infer<typeof createNoteSchema>

export { createNoteSchema, type CreateNoteSchema }
