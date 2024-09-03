import { type DateValue } from 'react-aria-components'
import z from 'zod'

const createNoteSchema = z.object({
  date: z
    .custom<DateValue>()
    .refine((val) => val !== null && val !== undefined, {
      message: 'Required',
    }),
  time: z.string().trim().min(1, 'Required'),
  visitType: z.string().trim().min(1, 'Required'),
  visitTitle: z.string().trim().min(1, 'Required'),
  provider: z.string().trim().min(1, 'Required'),
  cosigner: z.string().trim().min(1, 'Required'),
  description: z.string().trim().min(1, 'Required'),
})

type CreateNoteSchema = z.infer<typeof createNoteSchema>

export { createNoteSchema, type CreateNoteSchema }
