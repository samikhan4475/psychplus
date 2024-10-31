import React, { useMemo, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { PropsWithRow } from '@/components'
import {
  ClaimServiceLinePayment,
  ServiceLinePaymentAdjustment,
} from '../../../types'
import { SchemaType } from '../schema'
import { AdjustmentAddButton } from './adj-add-button'
import { AdjustmentCodeField } from './adjustment-code-field'
import { AdjustmentPill } from './adjustment-pill'
import { ReasonCodeField } from './reason-code-field'
import { RemarkCodeField } from './remark-code-field'

const AdjustmentReasonRemarkCell = ({
  row,
}: PropsWithRow<ClaimServiceLinePayment>) => {
  const form = useFormContext<SchemaType>()
  const [adjustment, setAdjustment] = useState({
    adjustmentCode: '',
    remarkCode: '',
    reasonCode: '',
  })
  const onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setAdjustment((prev) => ({ ...prev, [name]: value }))
  }

  const onChangeSelect = (value: string) =>
    setAdjustment((prev) => ({ ...prev, adjustmentCode: value }))

  const ServiceLineAdjustments = useMemo(() => {
    return form.watch(
      `claimServiceLinePayments.${row.index}.serviceLinePaymentAdjustments`,
    )
  }, [form, row.index])

  const addAdjustment = () => {
    const { adjustmentCode, reasonCode, remarkCode } = adjustment
    if (!adjustmentCode || !reasonCode || !remarkCode) return
    const newAdjustment: ServiceLinePaymentAdjustment = {
      id: '0',
      claimServiceLinePaymentId: '',
      adjustmentAmount: 0,
      adjustmentGroupCode: adjustmentCode,
      adjustmentReasonCode: reasonCode,
      remarkCode: remarkCode,
      recordStatus: 'Active',
    }
    form.setValue(
      `claimServiceLinePayments.${row.index}.serviceLinePaymentAdjustments`,
      [...(ServiceLineAdjustments ?? []), newAdjustment],
    )
  }

  return (
    <Flex gapX="2">
      <AdjustmentCodeField
        value={adjustment.adjustmentCode}
        onChange={onChangeSelect}
      />
      <ReasonCodeField value={adjustment.reasonCode} onChange={onChange} />
      <RemarkCodeField value={adjustment.remarkCode} onChange={onChange} />
      <AdjustmentAddButton onClick={addAdjustment} />
      {ServiceLineAdjustments?.map((adjustment, index) => (
        <AdjustmentPill
          adjustments={ServiceLineAdjustments}
          serviceLineIndex={row.index}
          adjustmentIndex={index}
          key={`${adjustment.id}-${index}`}
          paymentAdjustment={adjustment}
        />
      ))}
    </Flex>
  )
}

export { AdjustmentReasonRemarkCell }
