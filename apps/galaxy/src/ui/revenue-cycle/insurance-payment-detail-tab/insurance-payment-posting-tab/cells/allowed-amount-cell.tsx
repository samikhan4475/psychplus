import React from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { ClaimServiceLinePayment } from '../../../types'
import { WRITE_OFF_ADJUSTMENT } from '../constants'
import { SchemaType } from '../schema'
import { DollarInput } from './dollar-input'
import { addInsuranceAdjustment, amountCheck } from './utils'

const AllowedAmountCell = ({ row }: PropsWithRow<ClaimServiceLinePayment>) => {
  const form = useFormContext<SchemaType>()

  const writeOffAmount = form.watch(
    `claimServiceLinePayments.${row.index}.writeOffAmount`,
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

    if (parseFloat(value) > parseFloat(billedAmount)) {
      toast.error(`Allowed Amount cannot be greater than billed amount`)
      // Dont allow user to type if its not valid
      event.target.value = value.slice(0, value.length - 1)
    }
  }

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value } = event.target
    const adjustmentAmount =
      parseFloat(billedAmount ?? '0') - parseFloat(allowedAmount ?? '0')

    if (value === '' || value === '0' || adjustmentAmount === 0) {
      const updatedAdjustments = serviceLinePaymentAdjustments?.filter(
        (adj) =>
          adj.adjustmentGroupCode !==
            WRITE_OFF_ADJUSTMENT.adjustmentGroupCode &&
          adj.adjustmentReasonCode !==
            WRITE_OFF_ADJUSTMENT.adjustmentReasonCode,
      )

      form.setValue(
        `claimServiceLinePayments.${row.index}.serviceLinePaymentAdjustments`,
        updatedAdjustments,
      )
    } else {
      const updatedAdjustments = addInsuranceAdjustment({
        adjustmentAmount,
        adjustmentGroupCode: WRITE_OFF_ADJUSTMENT.adjustmentGroupCode,
        adjustmentReasonCode: WRITE_OFF_ADJUSTMENT.adjustmentReasonCode,
        serviceLinePaymentAdjustments: serviceLinePaymentAdjustments ?? [],
        claimPayment: row.original,
      })

      form.setValue(
        `claimServiceLinePayments.${row.index}.writeOffAmount`,
        `${+adjustmentAmount + +writeOffAmount}`,
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
      onKeyDown={amountCheck}
      onInput={onInput}
      onBlur={onBlur}
    />
  )
}

export { AllowedAmountCell }
