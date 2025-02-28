import { getLocalTimeZone } from '@internationalized/date'
import { DateValue } from 'react-aria-components'
import z from 'zod'

const dateValueToDateOnly = (dateValue: DateValue): Date => {
  const date = new Date(dateValue.toString())
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}
const addClaimNotesSchema = z
  .object({
    id: z.string().optional(),
    claimId: z.string().optional(),
    note: z
      .string()
      .min(1, 'Required')
      .max(300, 'Max 300 characters are allowed'),
    effectiveDateTo: z.custom<DateValue>(),
    effectiveDateFrom: z.custom<DateValue>(),
    isAlert: z.boolean().optional(),
    recordStatus: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.effectiveDateFrom || !data.effectiveDateTo) return true
      const fromDate = dateValueToDateOnly(data.effectiveDateFrom)
      const toDate = dateValueToDateOnly(data.effectiveDateTo)
      return toDate >= fromDate
    },
    {
      message:
        'Effective To date must be the same or after Effective From date',
      path: ['effectiveDateTo'],
    },
  )

const updateClaimNotesSchema = z.object({
  id: z.string().optional(),
  claimId: z.string().optional(),
  note: z
    .string()
    .min(1, 'Required')
    .max(300, 'Max 300 characters are allowed'),
  effectiveDateTo: z.custom<DateValue>(),
  effectiveDateFrom: z.custom<DateValue>(),
  isAlert: z.boolean().optional(),
  recordStatus: z.string().optional(),
})

type SchemaType = z.infer<typeof addClaimNotesSchema>
type UpdateClaimNotesSchemaType = z.infer<typeof updateClaimNotesSchema>

export {
  addClaimNotesSchema,
  updateClaimNotesSchema,
  type SchemaType,
  type UpdateClaimNotesSchemaType,
}
