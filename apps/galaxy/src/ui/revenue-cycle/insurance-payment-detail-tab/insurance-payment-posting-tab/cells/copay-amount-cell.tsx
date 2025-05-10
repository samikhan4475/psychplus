import React from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { ClaimServiceLinePayment } from '../../../types'
import { PaymentListTypes } from '../../types'
import { CO_PAY_ADJUSTMENT, PROCESSED_AS_REVERSAL } from '../constants'
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

const CopayAmountCell = ({ row }: PropsWithRow<ClaimServiceLinePayment>) => {
  const form = useFormContext<SchemaType>()
  const serviceLinePaymentAdjustments = form.watch(
    `claimServiceLinePayments.${row.index}.serviceLinePaymentAdjustments`,
  )
  const processedAsCode = form.watch('processedAsCode')
  const isReversal = processedAsCode === PROCESSED_AS_REVERSAL
  const paymentStatus = form.watch(`status`)
  const isRectifiedRow = form.watch(
    `claimServiceLinePayments.${row.index}.isRectifiedRow`,
  )

  const billedAmount = form.watch(
    `claimServiceLinePayments.${row.index}.billedAmount`,
  )

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    isReversal && addDefaultNegative(event)

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value } = event.target

    const removedNegative = removeNegative(value)
    const isEmptyValue = removedNegative === '' || removedNegative === '0'

    const updatedAdjustments = isEmptyValue
      ? removeInsuranceAdjustment({
          adjustmentGroupCode: CO_PAY_ADJUSTMENT.adjustmentGroupCode,
          adjustmentReasonCode: CO_PAY_ADJUSTMENT.adjustmentReasonCode,
          serviceLinePaymentAdjustments: serviceLinePaymentAdjustments ?? [],
        })
      : addInsuranceAdjustment({
          adjustmentAmount: parseFloat(value),
          adjustmentGroupCode: CO_PAY_ADJUSTMENT.adjustmentGroupCode,
          adjustmentReasonCode: CO_PAY_ADJUSTMENT.adjustmentReasonCode,
          serviceLinePaymentAdjustments: serviceLinePaymentAdjustments ?? [],
          adjustmentStatus: CO_PAY_ADJUSTMENT.adjustmentStatus,
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
      toast.error(`Copay amount cannot be greater than billed amount`)
      return e.preventDefault()
    }

    form.setValue(
      `claimServiceLinePayments.${row.index}.copayAmount`,
      pastedAmount,
    )
  }

  return (
    <DollarInput
      name={`claimServiceLinePayments.${row.index}.copayAmount`}
      onBlur={onBlur}
      onInput={onInput}
      onPaste={onPaste}
      disabled={!isRectifiedRow && paymentStatus === PaymentListTypes.Posted}
      onKeyDown={(e) => amountCheck(e, isReversal)}
    />
  )
}

export { CopayAmountCell }
