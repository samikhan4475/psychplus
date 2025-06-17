import { DateValue } from 'react-aria-components'
import z from 'zod'
import { formatDateToISOString } from '@/utils'

const schema = z
  .object({
    id: z.string(),
    postedAmount: z.number().optional(),
    insuranceName: z.string().min(1, { message: 'Insurance name is required' }),
    insurancePlanId:z.string().min(1,'Required'),
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
    receivedDate: z.custom<DateValue>().superRefine((val, ctx) => {
      if (val === undefined || val === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Received date is required',
        })
      }
      const convertedDate = formatDateToISOString(val) ?? ''
      if (val && new Date(convertedDate) > new Date()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Received date cannot be future date',
        })
      }
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
  .superRefine((data, ctx) => {
    const { id, amount, postedAmount } = data
    if (id && postedAmount && postedAmount !== 0 && amount < postedAmount) {
      ctx.addIssue({
        path: ['amount'],
        message: `Amount should not be less than posted amount (${postedAmount})`,
        code: z.ZodIssueCode.custom,
      })
    }
  })

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
