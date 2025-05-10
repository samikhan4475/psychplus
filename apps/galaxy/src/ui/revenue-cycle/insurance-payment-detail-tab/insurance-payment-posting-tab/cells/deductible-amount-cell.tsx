import React from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { ClaimServiceLinePayment } from '../../../types'
import { PaymentListTypes } from '../../types'
import { DEDUCTIBLE_ADJUSTMENT, PROCESSED_AS_REVERSAL } from '../constants'
import { SchemaType } from '../schema'
import { DollarInput } from './dollar-input'
import {
  addDefaultNegative,
  addInsuranceAdjustment,
  amountCheck,
  amountPaste,
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

  const paymentStatus = form.watch(`status`)
  const isRectifiedRow = form.watch(
    `claimServiceLinePayments.${row.index}.isRectifiedRow`,
  )

  const billedAmount = form.watch(
    `claimServiceLinePayments.${row.index}.billedAmount`,
  )

  const processedAsCode = form.watch('processedAsCode')
  const isReversal = processedAsCode === PROCESSED_AS_REVERSAL
  const onInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    isReversal && addDefaultNegative(event)

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
          adjustmentStatus: DEDUCTIBLE_ADJUSTMENT.adjustmentStatus,
          claimPayment: row.original,
        })

    form.setValue(
      `claimServiceLinePayments.${row.index}.serviceLinePaymentAdjustments`,
      updatedAdjustments,
    )
  }

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedAmount = amountPaste(e, isReversal)
    if (!pastedAmount) return
    if (+removeNegative(pastedAmount) > +billedAmount) {
      toast.error(`Deductible amount cannot be greater than billed amount`)
      return e.preventDefault()
    }

    form.setValue(
      `claimServiceLinePayments.${row.index}.deductibleAmount`,
      pastedAmount,
    )
  }

  return (
    <DollarInput
      onInput={onInput}
      name={`claimServiceLinePayments.${row.index}.deductibleAmount`}
      onBlur={onBlur}
      onPaste={onPaste}
      disabled={!isRectifiedRow && paymentStatus === PaymentListTypes.Posted}
      onKeyDown={(e) => amountCheck(e, isReversal)}
    />
  )
}

export { DeductibleAmountCell }
