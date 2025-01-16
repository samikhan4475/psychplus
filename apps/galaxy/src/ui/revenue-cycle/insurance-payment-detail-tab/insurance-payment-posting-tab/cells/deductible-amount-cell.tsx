import React from 'react'
import { useFormContext } from 'react-hook-form'
import { PropsWithRow } from '@/components'
import { ClaimServiceLinePayment } from '../../../types'
import { DEDUCTIBLE_ADJUSTMENT, PROCESSED_AS_REVERSAL } from '../constants'
import { SchemaType } from '../schema'
import { DollarInput } from './dollar-input'
import {
  addDefaultNegative,
  addInsuranceAdjustment,
  amountCheck,
  removeInsuranceAdjustment,
  removeNegative,
} from './utils'

const DeductibleAmountCell = ({
  row,
}: PropsWithRow<ClaimServiceLinePayment>) => {
  const form = useFormContext<SchemaType>()
  const serviceLinePaymentAdjustments = form.watch(
    `claimServiceLinePayments.${row.index}.serviceLinePaymentAdjustments`,
  )
  const processedAsCode = form.watch('processedAsCode')

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    processedAsCode === PROCESSED_AS_REVERSAL && addDefaultNegative(event)

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value } = event.target

    const removedNegative = removeNegative(value)
    const isEmptyValue = removedNegative === '' || removedNegative === '0'

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
      onInput={onInput}
      name={`claimServiceLinePayments.${row.index}.deductibleAmount`}
      onBlur={onBlur}
      onKeyDown={(e) =>
        amountCheck(e, processedAsCode === PROCESSED_AS_REVERSAL)
      }
    />
  )
}

export { DeductibleAmountCell }
