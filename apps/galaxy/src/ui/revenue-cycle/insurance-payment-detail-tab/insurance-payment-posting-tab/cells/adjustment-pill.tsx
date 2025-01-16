import React from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Box, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { ServiceLinePaymentAdjustment } from '@/ui/revenue-cycle/types'
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
    adjustmentStatus,
    remarkCode,
  },
  adjustments,
  serviceLineIndex,
  adjustmentIndex,
}: AdjustmentPillProps) => {
  const form = useFormContext<SchemaType>()
  const writeOffAmount = form.watch(
    `claimServiceLinePayments.${serviceLineIndex}.writeOffAmount`,
  )
  const removeAdjustment = () => {
    const updatedAdjustments = adjustments
      .map((adj, index) => {
        if (!adj.id && adjustmentIndex === index) return null
        if (adj.id && index === adjustmentIndex)
          return { ...adj, recordStatus: 'Inactive' }
        return adj
      })
      .filter((v) => v !== null)

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
      updatedAdjustments,
    )
  }
  return (
    <Box className="rounded-full flex min-w-fit items-center bg-blue-4 px-2 py-[2px]">
      <Text className="text-[10px]" weight="medium">
        {adjustmentGroupCode}-{adjustmentReasonCode}
        {remarkCode && `-${remarkCode}`} - {`$${adjustmentAmount}`}
      </Text>
      <Cross1Icon
        onClick={removeAdjustment}
        className="ml-1"
        width="11"
        height="11"
      />
    </Box>
  )
}

export { AdjustmentPill }
