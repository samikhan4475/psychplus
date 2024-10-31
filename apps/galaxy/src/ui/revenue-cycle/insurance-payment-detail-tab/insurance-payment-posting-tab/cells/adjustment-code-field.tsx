import React from 'react'
import { Select } from '@radix-ui/themes'

interface AdjustmentCodeProps {
  onChange: (value: string) => void
  value: string
}
const AdjustmentCodeField = ({ onChange, value }: AdjustmentCodeProps) => {
  return (
    <Select.Root onValueChange={onChange} value={value} size="1">
      <Select.Trigger
        variant="soft"
        className="min-w-12 max-w-12 h-4 border-none bg-transparent pl-1"
      />
      <Select.Content position="popper" align="center" highContrast>
        {[{ label: 'CO', value: 'CO' }]?.map((opt) => (
          <Select.Item key={opt.value} value={opt.value}>
            {opt.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export { AdjustmentCodeField }
