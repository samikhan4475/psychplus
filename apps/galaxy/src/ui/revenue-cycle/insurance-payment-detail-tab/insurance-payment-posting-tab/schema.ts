import z from 'zod'

const ServiceLinePaymentAdjustmentSchema = z.object({
  id: z.string(),
  recordStatus: z.string(),
  claimServiceLinePaymentId: z.string(),
  adjustmentAmount: z.number(),
  adjustmentReasonCode: z.string(),
  remarkCode: z.string(),
  adjustmentGroupCode: z.string(),
})

const ClaimServiceLinePaymentSchema = z.object({
  id: z.string(),
  chargeId: z.string(),
  recordStatus: z.string(),
  claimPaymentId: z.string(),
  claimServiceLineId: z.string(),
  dateOfServiceFrom: z.date(),
  dateOfServiceTo: z.date(),
  cptCode: z.string(),
  units: z.number(),
  billedAmount: z.number(),
  totalAmount: z.number(),
  allowedAmount: z.number(),
  paidAmount: z.number(),
  copayAmount: z.number(),
  coinsuranceAmount: z.number(),
  deductibleAmount: z.number(),
  otherPR: z.number(),
  writeOffAmount: z.number(),
  modifierCode1: z.string(),
  modifierCode2: z.string().optional(),
  modifierCode3: z.string().optional(),
  modifierCode4: z.string().optional(),
  serviceLinePaymentAdjustments: z
    .array(ServiceLinePaymentAdjustmentSchema)
    .optional(),
})

const schema = z.object({
  id: z.string(),
  recordStatus: z.string(),
  paymentId: z.string(),
  claimId: z.string(),
  paymentSource: z.string(),
  insurancePolicyId: z.string(),
  processedAsCode: z.string(),
  insuranceInternalControlNumber: z.string(),
  status: z.string(),
  billedAmount: z.number(),
  allowedAmount: z.number(),
  paidAmount: z.number(),
  copayAmount: z.number(),
  coinsuranceAmount: z.number(),
  deductibleAmount: z.number(),
  otherPr: z.number(),
  writeOffAmount: z.number(),
  claimServiceLinePayments: z.array(ClaimServiceLinePaymentSchema),
})
type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType, ClaimServiceLinePaymentSchema }
