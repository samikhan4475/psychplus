import React from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { ClaimServiceLinePayment } from '../../../types'
import { PaymentListTypes } from '../../types'
import {
  allowedAmountKeys,
  PROCESSED_AS_REVERSAL,
  WRITE_OFF_ADJUSTMENT,
} from '../constants'
import { SchemaType } from '../schema'
import { DollarInput } from './dollar-input'
import {
  addDefaultNegative,
  addInsuranceAdjustment,
  amountCheck,
  getOtherWriteOff,
  removeNegative,
} from './utils'

const AllowedAmountCell = ({ row }: PropsWithRow<ClaimServiceLinePayment>) => {
  const form = useFormContext<SchemaType>()
  const processedAsCode = form.watch('processedAsCode')

  const paymentStatus = form.watch(`status`)
  const isRectifiedRow = form.watch(
    `claimServiceLinePayments.${row.index}.isRectifiedRow`,
  )
  const billedAmount = form.watch(
    `claimServiceLinePayments.${row.index}.billedAmount`,
  )

  const allowedAmount = form.watch(
    `claimServiceLinePayments.${row.index}.allowedAmount`,
  )

  const serviceLinePaymentAdjustments = form.watch(
    `claimServiceLinePayments.${row.index}.serviceLinePaymentAdjustments`,
  )

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if (processedAsCode === PROCESSED_AS_REVERSAL) addDefaultNegative(event)

    if (parseFloat(removeNegative(value)) > parseFloat(billedAmount)) {
      toast.error(`Allowed Amount cannot be greater than billed amount`)
      // Dont allow user to type if its not valid
      event.target.value = value.slice(0, value.length - 1)
    }
  }

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value } = event.target
    const adjustmentAmount =
      parseFloat(billedAmount ?? '0') -
      parseFloat(removeNegative(allowedAmount) || '0')
    if (value === '' || value === '0' || removeNegative(value) === '') {
      const updatedAdjustments = serviceLinePaymentAdjustments?.filter(
        (adj) =>
          adj.adjustmentGroupCode !==
            WRITE_OFF_ADJUSTMENT.adjustmentGroupCode &&
          adj.adjustmentReasonCode !==
            WRITE_OFF_ADJUSTMENT.adjustmentReasonCode,
      )
      const otherAdjustments = getOtherWriteOff(serviceLinePaymentAdjustments)
      form.setValue(
        `claimServiceLinePayments.${row.index}.serviceLinePaymentAdjustments`,
        updatedAdjustments,
      )

      form.setValue(
        `claimServiceLinePayments.${row.index}.writeOffAmount`,
        `${otherAdjustments}`,
      )
      form.setValue(`claimServiceLinePayments.${row.index}.paidAmount`, ``)
    } else {
      const finalAdjustmentAmount =
        processedAsCode === PROCESSED_AS_REVERSAL
          ? -+adjustmentAmount
          : +adjustmentAmount

      const updatedAdjustments = addInsuranceAdjustment({
        adjustmentAmount: finalAdjustmentAmount,
        adjustmentGroupCode: WRITE_OFF_ADJUSTMENT.adjustmentGroupCode,
        adjustmentReasonCode: WRITE_OFF_ADJUSTMENT.adjustmentReasonCode,
        serviceLinePaymentAdjustments: serviceLinePaymentAdjustments ?? [],
        claimPayment: row.original,
      })

      const otherAdjustments = getOtherWriteOff(serviceLinePaymentAdjustments)

      form.setValue(
        `claimServiceLinePayments.${row.index}.writeOffAmount`,
        `${+finalAdjustmentAmount + +otherAdjustments}`,
      )
      form.setValue(
        `claimServiceLinePayments.${row.index}.serviceLinePaymentAdjustments`,
        updatedAdjustments,
      )
    }
  }

  return (
    <DollarInput
      name={`claimServiceLinePayments.${row.index}.allowedAmount`}
      onKeyDown={(e) =>
        amountCheck(e, processedAsCode === PROCESSED_AS_REVERSAL)
      }
      disabled={
        !isRectifiedRow &&
        (paymentStatus === PaymentListTypes.Posted ||
          allowedAmountKeys.includes(processedAsCode))
      }
      onInput={onInput}
      onBlur={onBlur}
    />
  )
}

export { AllowedAmountCell }
