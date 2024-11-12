import z from 'zod'
import { PaymentMethod, PaymentType } from './types'
import { paymentMethodRequiredFields } from './utils'

const paymentSchema = z
  .object({
    amount: z.string().optional(),
    coPayAmount: z.string().optional(),
    coInsApp: z.array(z.string()).optional(),
    coPayApp: z.array(z.string()).optional(),
    coInsAmount: z.string().optional(),
    outstandingBalanceAmount: z.string().optional(),
    customAmount: z
      .string()
      .optional()
      .refine((val) => !val || parseFloat(val) > 0, {
        message: 'Amount must be greater than zero',
      }),
    remainingBalance: z.string().optional(),
    customPayment: z.string().optional(),
    paymentPlanAmount: z.string().optional(),
    paymentTotal: z.string().optional(),
    paymentMethod: z.nativeEnum(PaymentMethod, {
      errorMap: () => ({ message: 'Required' }),
    }),
    card_Key: z.string().optional(),
    card_id: z.string().optional(),
    paymentDescription: z
      .string()
      .max(128, 'Max 128 character are allowed ')
      .optional(),
    paymentType: z
      .array(z.nativeEnum(PaymentType))
      .nonempty({ message: 'Select at least one payment type' }),
    totalAmount: z.string().optional(),
    cashAmount: z.string().optional(),
    transactionNumber: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod) {
      const requiredPaymentMethodFieldInfo =
        paymentMethodRequiredFields[data.paymentMethod]
      if (requiredPaymentMethodFieldInfo) {
        const { field, message } = requiredPaymentMethodFieldInfo
        if (!data[field]) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: message,
            path: [field],
          })
        }
      }
    }
    if (data.paymentType.includes(PaymentType.CoPay)) {
      if (!data?.coPayApp || data?.coPayApp?.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required.',
          path: ['coPayApp'],
        })
      }
    }
    if (data.paymentType.includes(PaymentType.CoIns)) {
      if (!data.coInsApp || data?.coInsApp?.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required.',
          path: ['coInsApp'],
        })
      }
    }

    if (data.paymentType.includes(PaymentType.OutstandingBalance)) {
      const outstandingBalance = parseFloat(
        data.outstandingBalanceAmount || '0',
      )
      const remainingBalance = parseFloat(data?.remainingBalance || '0')

      if (!data.outstandingBalanceAmount || isNaN(outstandingBalance)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['outstandingBalanceAmount'],
        })
      } else if (outstandingBalance > remainingBalance) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Amount cannot be greater than remaining balance.',
          path: ['outstandingBalanceAmount'],
        })
      } else if (outstandingBalance < remainingBalance) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Amount cannot be less than remaining balance.',
          path: ['outstandingBalanceAmount'],
        })
      }
    }
    if (data.paymentType.includes(PaymentType.CustomPayment)) {
      if (!data.customAmount) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['customAmount'],
        })
      } else {
        const customAmount = parseFloat(data.customAmount)
        const remainingAmount = parseFloat(data.remainingBalance || '0')
        if (remainingAmount <= 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Remaining balance must be greater than zero.',
            path: ['customAmount'],
          })
        } else if (customAmount > remainingAmount) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Custom amount cannot be greater than remaining balance.',
            path: ['customAmount'],
          })
        }
      }
    }
  })

type PaymentDetailSchemaType = z.infer<typeof paymentSchema>

export { type PaymentDetailSchemaType, paymentSchema }
