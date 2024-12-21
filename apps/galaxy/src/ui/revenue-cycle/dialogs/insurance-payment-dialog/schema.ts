import { DateValue } from 'react-aria-components'
import z from 'zod'

const schema = z.object({
  id: z.string(),
  insuranceName: z.string().min(1, { message: 'Insurance name is required' }),
  paymentMethod: z.string().min(1, { message: 'Payment method is required' }),
  checkNumber: z.string().min(1, { message: 'Check number is required' }),
  amount: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        const parsed = parseFloat(val)
        return isNaN(parsed) ? undefined : parsed
      }
      return val
    },
    z
      .number({
        required_error: 'Amount is required and should be valid number',
        invalid_type_error: 'Amount must be a valid number',
      })
      .min(0.01, { message: 'Amount must be greater than 0' }),
  ),
  comments: z.string().optional(),
  checkDate: z
    .custom<DateValue>()
    .refine((val) => val !== undefined && val !== null, {
      message: 'Check date is required',
    }),
  receivedDate: z
    .custom<DateValue>()
    .refine((val) => val !== undefined && val !== null, {
      message: 'Received date is required',
    }),
  depositDate: z
    .custom<DateValue>()
    .refine((val) => val !== undefined && val !== null, {
      message: 'Deposit date is required',
    }),
  attachments: z
    .array(
      z.object({
        id: z.string(),
        recordStatus: z.string().optional(),
        paymentId: z.string().optional(),
        attachmentType: z.string().optional(),
        fileUrl: z.string().optional(),
        fileName: z.string(),
        isNewUpload: z.boolean().optional(),
        file: z.instanceof(File).optional(),
      }),
    )
    .optional(),
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
