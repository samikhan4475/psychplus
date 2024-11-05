import { DateValue } from 'react-aria-components'
import { z } from 'zod'

const positiveString = (fieldName: string) =>
  z
    .string()
    .min(1, `${fieldName} is required`)
    .refine((val) => parseFloat(val) > 0, {
      message: `${fieldName} must be greater than 0`,
    })

const chargeSchema = z.object({
  type: z.string().min(1, 'Required'),
  description: z.string().max(30, 'Max 30 characters allowed').optional(),
  unappliedBalance: z.string().optional(),
  chargeDate: z
    .custom<DateValue>()
    .refine((value) => value !== undefined && value !== null, {
      message: 'Required',
    }),
  chargeTime: z.string().min(1, 'Required'),
  balanceDue: positiveString('Balance Due'),
  coPayDue: positiveString('Co-Pay Due'),
  coPayPaid: positiveString('Co-Pay Paid'),
  coInsuranceDue: positiveString('Co-Insurance Due'),
  coInsurancePaid: positiveString('Co-Insurance Paid'),
  balancePaid: positiveString('Balance Paid'),
  copayPreferredPartner: positiveString('Co-Pay Preferred Partner'),
  coInsurancePreferredPartner: positiveString('Co-Insurance Preferred Partner'),
  balancePreferredPartner: positiveString('Balance Preferred Partner'),
})

type CustomChargeSchemaType = z.infer<typeof chargeSchema>

export { chargeSchema, type CustomChargeSchemaType }
