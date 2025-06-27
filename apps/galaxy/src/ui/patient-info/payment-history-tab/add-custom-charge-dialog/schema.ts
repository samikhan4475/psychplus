import { DateValue } from 'react-aria-components'
import { z } from 'zod'
import { toNumber } from './utils'

const optionalString = z.string().optional()

const chargeSchema = z
  .object({
    type: z.string().min(1, 'Required'),
    description: z
      .string()
      .min(1, 'Required')
      .max(50, 'Max 50 characters allowed'),
    unappliedPayment: z.string().optional(),
    chargeDate: z
      .custom<DateValue>()
      .refine((value) => value !== undefined && value !== null, {
        message: 'Required',
      }),
    chargeTime: z.string().min(1, 'Required'),
    balanceDue: z.string().optional(),
    coPayDue: optionalString,
    coPayPaid: optionalString,
    coInsuranceDue: optionalString,
    coInsurancePaid: optionalString,
    balancePaid: optionalString,
    coPayPreferredPartner: optionalString,
    coInsurancePreferredPartner: optionalString,
    balancePreferredPartner: optionalString,
    appointmentId: z.number().optional(),
    transactionNumber: optionalString,
  })
  .superRefine((data, ctx) => {
    const coPayDue = toNumber(data.coPayDue)
    const coPayPaid = toNumber(data.coPayPaid)
    const balanceDue = toNumber(data.balanceDue)
    const balancePaid = toNumber(data.balancePaid)
    const coInsuranceDue = toNumber(data.coInsuranceDue)
    const coInsurancePaid = toNumber(data.coInsurancePaid)

    const fields = [
      {
        value: coPayDue,
        paid: coPayPaid,
        fieldName: 'coPayDue',
        message: 'CoPay Due cannot be less than CoPay Paid.',
      },
      {
        value: balanceDue,
        paid: balancePaid,
        fieldName: 'balanceDue',
        message: 'Balance Due cannot be less than Balance Paid.',
      },
      {
        value: coInsuranceDue,
        paid: coInsurancePaid,
        fieldName: 'coInsuranceDue',
        message: 'CoInsurance Due cannot be less than CoInsurance Paid.',
      },
    ]

    fields.forEach(({ value, paid, fieldName, message }) => {
      if (value < paid) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message,
          path: [fieldName],
        })
      }
    })
  })

type CustomChargeSchemaType = z.infer<typeof chargeSchema>

export { chargeSchema, type CustomChargeSchemaType }
