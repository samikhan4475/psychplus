const WRITE_OFF_ADJUSTMENT = {
  adjustmentGroupCode: 'CO',
  adjustmentReasonCode: '45',
  adjustmentStatus: 'WriteOff',
} as const

const allowedAmountKeys: string[] = [
  'ProcessedAsSecondary',
  'ProcessedAsTertiary',
  'ProcessedAsSecondaryAndForwarded',
  'ProcessedAsTertiaryAndForwarded',
]

const paymentSourceMapping = {
  ProcessedAsPrimary: 'Primary',
  ProcessedAsSecondary: 'Secondary',
  ProcessedAsTertiary: 'Tertiary',
  ProcessedAsPrimaryAndForwarded: 'Primary',
  ProcessedAsSecondaryAndForwarded: 'Secondary',
  ProcessedAsTertiaryAndForwarded: 'Tertiary',
} as const

const DEDUCTIBLE_ADJUSTMENT = {
  adjustmentGroupCode: 'PR',
  adjustmentReasonCode: '1',
  adjustmentStatus: 'PatientResponsibility',
} as const

const CO_INSURANCE_ADJUSTMENT = {
  adjustmentGroupCode: 'PR',
  adjustmentReasonCode: '2',
  adjustmentStatus: 'PatientResponsibility',
} as const

const CO_PAY_ADJUSTMENT = {
  adjustmentGroupCode: 'PR',
  adjustmentReasonCode: '3',
  adjustmentStatus: 'PatientResponsibility',
} as const

const DEFAULT_ADJUSTMENT_TYPE = 'Denied'

const PROCESSED_AS_REVERSAL = 'ReversalOfPreviousPayment'

const adjustmentStatusMapping: Record<string, string> = {
  'CO-45': WRITE_OFF_ADJUSTMENT.adjustmentStatus,
  ...['PR-1', 'PR-2', 'PR-3'].reduce((acc, key) => {
    acc[key] = CO_INSURANCE_ADJUSTMENT.adjustmentStatus
    return acc
  }, {} as Record<string, string>),
}

const adjustmentMapping = {
  [`${WRITE_OFF_ADJUSTMENT.adjustmentGroupCode}_${WRITE_OFF_ADJUSTMENT.adjustmentReasonCode}`]:
    'allowedAmount',
  [`${DEDUCTIBLE_ADJUSTMENT.adjustmentGroupCode}_${DEDUCTIBLE_ADJUSTMENT.adjustmentReasonCode}`]:
    'deductibleAmount',
  [`${CO_INSURANCE_ADJUSTMENT.adjustmentGroupCode}_${CO_INSURANCE_ADJUSTMENT.adjustmentReasonCode}`]:
    'coinsuranceAmount',
  [`${CO_PAY_ADJUSTMENT.adjustmentGroupCode}_${CO_PAY_ADJUSTMENT.adjustmentReasonCode}`]:
    'copayAmount',
}

type AdjustmentField =
  | 'allowedAmount'
  | 'deductibleAmount'
  | 'coinsuranceAmount'
  | 'copayAmount'

export {
  WRITE_OFF_ADJUSTMENT,
  DEFAULT_ADJUSTMENT_TYPE,
  CO_INSURANCE_ADJUSTMENT,
  paymentSourceMapping,
  DEDUCTIBLE_ADJUSTMENT,
  CO_PAY_ADJUSTMENT,
  adjustmentMapping,
  adjustmentStatusMapping,
  PROCESSED_AS_REVERSAL,
  allowedAmountKeys,
  type AdjustmentField,
}
