import React from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Box, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { ServiceLinePaymentAdjustment } from '@/ui/revenue-cycle/types'
import { SchemaType } from '../schema'

interface AdjustmentPillProps {
  paymentAdjustment: ServiceLinePaymentAdjustment
  adjustments: ServiceLinePaymentAdjustment[]
  adjustmentIndex: number
  serviceLineIndex: number
}
const AdjustmentPill = ({
  paymentAdjustment: {
    id,
    adjustmentGroupCode,
    remarkCode,
    adjustmentReasonCode,
  },
  adjustments,
  serviceLineIndex,
  adjustmentIndex,
}: AdjustmentPillProps) => {
  const form = useFormContext<SchemaType>()

  const removeAdjustment = () => {
    if (id === '0') {
      form.setValue(
        `claimServiceLinePayments.${serviceLineIndex}.serviceLinePaymentAdjustments`,
        adjustments.filter((adj, index) => index !== adjustmentIndex),
      )
    }
  }

  return (
    <Box className="rounded-full flex min-w-fit items-center bg-blue-4 px-2 py-[2px]">
      <Text className="text-[10px]" weight="medium">
        {adjustmentGroupCode} ,{adjustmentReasonCode}, {remarkCode}
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
