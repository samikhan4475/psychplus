import React from 'react'
import { Select } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { SharedCode } from '@/types'
import { PaymentListTypes } from '../../types'
import { SchemaType } from '../schema'

interface AdjustmentCodeProps {
  onChange: (value: string) => void
  value: string
  rowIndex: number
}

const adjustmentOptions = (adjustmentCodeOptions: SharedCode[]) =>
  adjustmentCodeOptions.map((opt) => (
    <Select.Item key={opt.value} value={opt.value}>
      {opt.value}
    </Select.Item>
  ))

const AdjustmentCodeField = ({
  onChange,
  value,
  rowIndex,
}: AdjustmentCodeProps) => {
  const adjustmentCodeOptions = useCodesetCodes(CODESETS.AdjustmentGroupCode)

  const form = useFormContext<SchemaType>()

  const paymentStatus = form.watch(`status`)
  const isRectifiedRow = form.watch(
    `claimServiceLinePayments.${rowIndex}.isRectifiedRow`,
  )
  return (
    <Select.Root
      onValueChange={onChange}
      disabled={!isRectifiedRow && paymentStatus === PaymentListTypes.Posted}
      value={value}
      size="1"
    >
      <Select.Trigger
        variant="soft"
        className="min-w-12 max-w-12 h-4 border-none bg-transparent pl-1"
      />
      <Select.Content position="popper" align="center" highContrast>
        {adjustmentOptions(adjustmentCodeOptions)}
      </Select.Content>
    </Select.Root>
  )
}

export { AdjustmentCodeField }
