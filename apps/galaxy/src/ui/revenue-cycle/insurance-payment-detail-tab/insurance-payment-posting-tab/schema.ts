import { DateValue } from 'react-aria-components'
import z from 'zod'

const ServiceLinePaymentAdjustmentSchema = z.object({
  id: z.string().optional(),
  recordStatus: z.string(),
  claimServiceLinePaymentId: z.string().optional(),
  adjustmentAmount: z.number(),
  adjustmentReasonCode: z.string(),
  remarkCode: z.string(),
  adjustmentGroupCode: z.string(),
})

const ClaimServiceLinePaymentSchema = z.object({
  id: z.string().optional(),
  chargeId: z.string(),
  recordStatus: z.string(),
  claimPaymentId: z.string(),
  claimServiceLineId: z.string(),
  dateOfServiceFrom: z.custom<DateValue>(),
  dateOfServiceTo: z.custom<DateValue>(),
  cptCode: z.string(),
  units: z.number(),
  billedAmount: z.string(),
  allowedAmount: z.string(),
  paidAmount: z.string(),
  copayAmount: z.string(),
  coinsuranceAmount: z.string(),
  deductibleAmount: z.string(),
  otherPr: z.string(),
  writeOffAmount: z.string(),
  modifierCode1: z.string(),
  modifierCode2: z.string().optional(),
  modifierCode3: z.string().optional(),
  modifierCode4: z.string().optional(),
  serviceLinePaymentAdjustments: z
    .array(ServiceLinePaymentAdjustmentSchema)
    .optional(),
})

const schema = z.object({
  id: z.string().optional(),
  recordStatus: z.string(),
  paymentId: z.string(),
  claimId: z.string(),
  dateOfServiceFrom: z.date(),
  dateOfServiceTo: z.date(),
  paymentSource: z.string(),
  insurancePolicyId: z.string().optional(),
  processedAsCode: z.string(),
  insuranceInternalControlNumber: z.string(),
  status: z.string(),
  billedAmount: z.string(),
  allowedAmount: z.string(),
  paidAmount: z.string(),
  copayAmount: z.string(),
  coinsuranceAmount: z.string(),
  deductibleAmount: z.string(),
  otherPr: z.string(),
  writeOffAmount: z.string(),
  claimServiceLinePayments: z.array(ClaimServiceLinePaymentSchema),
})
type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType, ClaimServiceLinePaymentSchema }
