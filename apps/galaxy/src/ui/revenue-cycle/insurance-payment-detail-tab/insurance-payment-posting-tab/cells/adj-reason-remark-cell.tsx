import React, { useMemo, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { ClaimServiceLinePayment } from '../../../types'
import { WRITE_OFF_ADJUSTMENT } from '../constants'
import { SchemaType } from '../schema'
import { AdjustmentAddButton } from './adj-add-button'
import { AdjustmentAmountField } from './adjustment-amount-field'
import { AdjustmentCodeField } from './adjustment-code-field'
import { AdjustmentPill } from './adjustment-pill'
import { ReasonCodeField } from './reason-code-field'
import { updateOrAddAdjustment } from './utils'

const AdjustmentReasonRemarkCell = ({
  row,
}: PropsWithRow<ClaimServiceLinePayment>) => {
  const form = useFormContext<SchemaType>()
  const [adjustment, setAdjustment] = useState({
    adjustmentCode: '',
    adjustmentAmount: '',
    reasonCode: '',
  })
  const onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setAdjustment((prev) => ({ ...prev, [name]: value }))
  }

  const onChangeSelect = (value: string) =>
    setAdjustment((prev) => ({ ...prev, adjustmentCode: value }))

  const serviceLinePaymentAdjustments = useMemo(() => {
    return (
      form
        .watch(
          `claimServiceLinePayments.${row.index}.serviceLinePaymentAdjustments`,
        )
        ?.filter((adj) => adj.recordStatus === 'Active') ?? []
    )
  }, [form, row.index])

  const addAdjustment = () => {
    const { adjustmentCode, reasonCode, adjustmentAmount } = adjustment
    const { billedAmount } = row.original
    if (!adjustmentCode || !reasonCode || !adjustmentAmount) {
      toast.error('Adjustment GroupCode - ReasonCode - Amount must be filled')
    } else if (adjustmentAmount === '0') {
      toast.error('Adjustment amount must be greater than 0')
    } else if (+adjustmentAmount > +billedAmount) {
      toast.error(
        `Adjustment amount can't be greater than billed amount $${billedAmount}`,
      )
    } else {
      const updatedServiceLineAdjustments = updateOrAddAdjustment({
        adjustmentAmount: +adjustmentAmount,
        adjustmentReasonCode: reasonCode,
        adjustmentGroupCode: adjustmentCode,
        serviceLinePaymentAdjustments,
      })

      form.setValue(
        `claimServiceLinePayments.${row.index}.serviceLinePaymentAdjustments`,
        updatedServiceLineAdjustments,
      )

      if (
        adjustmentCode === WRITE_OFF_ADJUSTMENT.adjustmentGroupCode &&
        reasonCode === WRITE_OFF_ADJUSTMENT.adjustmentReasonCode
      ) {
        const allowedAmount = String(+billedAmount - +adjustmentAmount)
        form.setValue(
          `claimServiceLinePayments.${row.index}.writeOffAmount`,
          adjustmentAmount,
        )
        form.setValue(
          `claimServiceLinePayments.${row.index}.allowedAmount`,
          allowedAmount,
        )
      }

      setAdjustment({
        adjustmentCode: '',
        adjustmentAmount: '',
        reasonCode: '',
      })
    }
  }

  return (
    <Flex gapX="2" align="center" className="min-w-max">
      <AdjustmentCodeField
        value={adjustment.adjustmentCode}
        onChange={onChangeSelect}
      />
      <ReasonCodeField value={adjustment.reasonCode} onChange={onChange} />
      <AdjustmentAmountField
        value={adjustment.adjustmentAmount}
        onChange={onChange}
      />
      <AdjustmentAddButton onClick={addAdjustment} />
      {serviceLinePaymentAdjustments?.map((adjustment, index) => (
        <AdjustmentPill
          adjustments={serviceLinePaymentAdjustments}
          serviceLineIndex={row.index}
          adjustmentIndex={index}
          key={`${adjustment.adjustmentReasonCode}-${adjustment.adjustmentGroupCode}-${index}`}
          paymentAdjustment={adjustment}
        />
      ))}
    </Flex>
  )
}

export { AdjustmentReasonRemarkCell }
