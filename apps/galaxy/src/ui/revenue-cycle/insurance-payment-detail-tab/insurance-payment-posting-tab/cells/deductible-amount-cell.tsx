import React from 'react'
import { useFormContext } from 'react-hook-form'
import { PropsWithRow } from '@/components'
import { ClaimServiceLinePayment } from '../../../types'
import { DEDUCTIBLE_ADJUSTMENT } from '../constants'
import { SchemaType } from '../schema'
import { DollarInput } from './dollar-input'
import {
  addInsuranceAdjustment,
  amountCheck,
  removeInsuranceAdjustment,
} from './utils'

const DeductibleAmountCell = ({
  row,
}: PropsWithRow<ClaimServiceLinePayment>) => {
  const form = useFormContext<SchemaType>()
  const serviceLinePaymentAdjustments = form.watch(
    `claimServiceLinePayments.${row.index}.serviceLinePaymentAdjustments`,
  )

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value } = event.target

    const isEmptyValue = value === '' || value === '0'

    const updatedAdjustments = isEmptyValue
      ? removeInsuranceAdjustment({
          adjustmentGroupCode: DEDUCTIBLE_ADJUSTMENT.adjustmentGroupCode,
          adjustmentReasonCode: DEDUCTIBLE_ADJUSTMENT.adjustmentReasonCode,
          serviceLinePaymentAdjustments: serviceLinePaymentAdjustments ?? [],
        })
      : addInsuranceAdjustment({
          adjustmentAmount: parseFloat(value),
          adjustmentGroupCode: DEDUCTIBLE_ADJUSTMENT.adjustmentGroupCode,
          adjustmentReasonCode: DEDUCTIBLE_ADJUSTMENT.adjustmentReasonCode,
          serviceLinePaymentAdjustments: serviceLinePaymentAdjustments ?? [],
          claimPayment: row.original,
        })

    form.setValue(
      `claimServiceLinePayments.${row.index}.serviceLinePaymentAdjustments`,
      updatedAdjustments,
    )
  }

  return (
    <DollarInput
      name={`claimServiceLinePayments.${row.index}.deductibleAmount`}
      onBlur={onBlur}
      onKeyDown={amountCheck}
    />
  )
}

export { DeductibleAmountCell }
