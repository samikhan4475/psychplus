import React from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Box, Text, Tooltip } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { ServiceLinePaymentAdjustment } from '@/ui/revenue-cycle/types'
import { PaymentListTypes } from '../../types'
import { AdjustmentField, adjustmentMapping } from '../constants'
import { SchemaType } from '../schema'

interface AdjustmentPillProps {
  paymentAdjustment: ServiceLinePaymentAdjustment
  adjustments: ServiceLinePaymentAdjustment[]
  adjustmentIndex: number
  serviceLineIndex: number
}
const AdjustmentPill = ({
  paymentAdjustment: {
    adjustmentGroupCode,
    adjustmentAmount,
    adjustmentReasonCode,
    recordStatus,
    adjustmentStatus,
    remarkCode,
    id,
  },
  serviceLineIndex,
  adjustmentIndex,
}: AdjustmentPillProps) => {
  const form = useFormContext<SchemaType>()
  const writeOffAmount = form.watch(
    `claimServiceLinePayments.${serviceLineIndex}.writeOffAmount`,
  )

  const paymentStatus = form.watch(`status`)
  const isRectifiedRow = form.watch(
    `claimServiceLinePayments.${serviceLineIndex}.isRectifiedRow`,
  )

  const serviceLinePaymentAdjustments = form.watch(
    `claimServiceLinePayments.${serviceLineIndex}.serviceLinePaymentAdjustments`,
  )
  const removeAdjustment = () => {
    if (id && serviceLinePaymentAdjustments) {
      serviceLinePaymentAdjustments[adjustmentIndex].recordStatus = 'Inactive'
    } else {
      serviceLinePaymentAdjustments?.splice(adjustmentIndex, 1)
    }
    const adjustmentKey = `${adjustmentGroupCode}_${adjustmentReasonCode}`

    const field = adjustmentMapping[adjustmentKey] as AdjustmentField

    if (field) {
      form.setValue(`claimServiceLinePayments.${serviceLineIndex}.${field}`, '')
    }

    if (field === 'allowedAmount') {
      form.setValue(
        `claimServiceLinePayments.${serviceLineIndex}.writeOffAmount`,
        `${+writeOffAmount - +adjustmentAmount}`,
      )
    }
    if (adjustmentStatus === 'WriteOff')
      form.setValue(
        `claimServiceLinePayments.${serviceLineIndex}.writeOffAmount`,
        `${+writeOffAmount - +adjustmentAmount}`,
      )
    form.setValue(
      `claimServiceLinePayments.${serviceLineIndex}.serviceLinePaymentAdjustments`,
      serviceLinePaymentAdjustments,
    )
  }
  if (recordStatus === 'Inactive') return ''
  return (
    <Tooltip
      delayDuration={250}
      content={adjustmentStatus}
      className={!adjustmentStatus ? 'hidden' : 'block'}
    >
      <Box className="rounded-full flex min-w-fit cursor-default items-center bg-blue-4 px-2 py-[2px]">
        <Text className="text-[10px]" weight="medium">
          {adjustmentGroupCode}-{adjustmentReasonCode}
          {remarkCode && `-${remarkCode}`} - {`$${adjustmentAmount}`}
        </Text>
        {(isRectifiedRow || paymentStatus === PaymentListTypes.Unposted) && (
          <Cross1Icon
            onClick={removeAdjustment}
            className="ml-1 cursor-pointer"
            width="11"
            height="11"
          />
        )}
      </Box>
    </Tooltip>
  )
}

export { AdjustmentPill }
