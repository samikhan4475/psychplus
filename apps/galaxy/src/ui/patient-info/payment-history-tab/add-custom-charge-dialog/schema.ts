import { DateValue } from 'react-aria-components'
import { z } from 'zod'

const optionalString = z.string().optional()

const chargeSchema = z
  .object({
    type: z.string().min(1, 'Required'),
    description: z.string().max(50, 'Max 50 characters allowed').optional(),
    unappliedPayment: z.string().optional(),
    chargeDate: z
      .custom<DateValue>()
      .refine((value) => value !== undefined && value !== null, {
        message: 'Required',
      }),
    chargeTime: z.string().min(1, 'Required'),
    balanceDue: z
      .string()
      .min(1, 'Required')
      .refine((value) => parseFloat(value) > 0, {
        message: 'Balance Due must be greater than zero',
      }),
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
    if (data.appointmentId) return
    const coPayDue = parseFloat(data.coPayDue ?? '0')
    const coPayPaid = parseFloat(data.coPayPaid ?? '0')
    const balanceDue = parseFloat(data.balanceDue ?? '0')
    const balancePaid = parseFloat(data.balancePaid ?? '0')
    const coInsuranceDue = parseFloat(data.coInsuranceDue ?? '0')
    const coInsurancePaid = parseFloat(data.coInsurancePaid ?? '0')

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
