import React from 'react'
import { Select } from '@radix-ui/themes'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { SharedCode } from '@/types'

interface AdjustmentCodeProps {
  onChange: (value: string) => void
  value: string
}

const adjustmentOptions = (adjustmentCodeOptions: SharedCode[]) =>
  adjustmentCodeOptions.map((opt) => (
    <Select.Item key={opt.value} value={opt.value}>
      {opt.value}
    </Select.Item>
  ))

const AdjustmentCodeField = ({ onChange, value }: AdjustmentCodeProps) => {
  const adjustmentCodeOptions = useCodesetCodes(CODESETS.AdjustmentGroupCode)
  return (
    <Select.Root onValueChange={onChange} value={value} size="1">
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
