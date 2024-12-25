const WRITE_OFF_ADJUSTMENT = {
  adjustmentGroupCode: 'CO',
  adjustmentReasonCode: '45',
  status: 'W',
} as const

const DEDUCTIBLE_ADJUSTMENT = {
  adjustmentGroupCode: 'PR',
  adjustmentReasonCode: '1',
  status: 'PR',
} as const

const CO_INSURANCE_ADJUSTMENT = {
  adjustmentGroupCode: 'PR',
  adjustmentReasonCode: '2',
  status: 'PR',
} as const

const CO_PAY_ADJUSTMENT = {
  adjustmentGroupCode: 'PR',
  adjustmentReasonCode: '3',
  status: 'PR',
} as const

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
  CO_INSURANCE_ADJUSTMENT,
  DEDUCTIBLE_ADJUSTMENT,
  CO_PAY_ADJUSTMENT,
  adjustmentMapping,
  type AdjustmentField,
}
