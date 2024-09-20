import { DateValue } from 'react-aria-components'
import z from 'zod'
import { PaymentMethod } from '../types'
import { paymentMethodRequiredFields } from './utils'

const paymentDetailschema = z
  .object({
    deductablenotmet: z.string().optional(),
    remainingdeductionbalance: z.string().optional(),
    paymentMedium: z.string().optional(),
    verification: z.string().optional(),
    amount: z.string().optional(),
    copaypp: z.string().optional(),
    copaydue: z.string().optional(),
    copayPaid: z.string().optional(),
    coInsdue: z.string().optional(),
    coInsPaid: z.string().optional(),
    coInspp: z.string().optional(),
    balancedue: z.string().optional(),
    balancePaid: z.string().optional(),
    balancepp: z.string().optional(),
    coPayAmount: z.string().optional(),
    coInsApp: z.array(z.string()).optional(),
    coPayApp: z.array(z.string()).optional(),
    coInsAmount: z.string().optional(),
    outstandingBalanceAmount: z.string().optional(),
    customAmount: z.string().optional(),
    remainingBalance: z.string().optional(),
    customPayment: z.string().optional(),
    paymentPlanAmount: z.string().optional(),
    paymentTotal: z.string().optional(),
    paymentMethod: z.string().min(1, 'Required'),
    defaultCardId: z
      .string()
      .max(28, 'Max 28 characters are allowed')
      .optional(),
    defaultCardKey: z.string().optional(),
    transactionNo: z.string().optional(),
    checkNumber: z.string().optional(),
    paymentType: z
      .array(z.string())
      .nonempty({ message: 'Select at least one payment type' }),
    chargeDate: z.custom<DateValue | null>(),
    chargeFrequency: z.string().optional(),
    chargeAmount: z.string().optional(),
    chargeTimes: z.string().optional(),
    totalAmount: z.string().optional(),
    cashAmount: z.string().optional(),
    transactionNumber: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.paymentMethod &&
      paymentMethodRequiredFields[data.paymentMethod as PaymentMethod]
    ) {
      const { field, message } =
        paymentMethodRequiredFields[data.paymentMethod as PaymentMethod]
      if (!data[field]) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message,
          path: [field],
        })
      }
    }

    if (data.paymentType.includes('copay')) {
      if (!data?.coPayApp || data?.coPayApp?.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required.',
          path: ['coPayApp'],
        })
      }
      if (!data?.coPayAmount) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['coPayAmount'],
        })
      }
    }
    if (data.paymentType.includes('coinsurance')) {
      if (!data.coInsApp || data?.coInsApp?.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required.',
          path: ['coInsApp'],
        })
      }
      if (!data?.coInsAmount) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['coInsAmount'],
        })
      }
    }

    if (data.paymentType.includes('outstandingBalance')) {
      const outstandingBalance = parseFloat(
        data.outstandingBalanceAmount || '0',
      )
      const remainingBalance = parseFloat(data?.remainingBalance || '0')

      if (!data.outstandingBalanceAmount) {
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
    if (data.paymentType.includes('customPayment')) {
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

type PaymentDetailSchema = z.infer<typeof paymentDetailschema>

export { type PaymentDetailSchema, paymentDetailschema }
