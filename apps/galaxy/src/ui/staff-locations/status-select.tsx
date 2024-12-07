import React from 'react'
import { Select } from '@radix-ui/themes'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const StatusSelect = () => {
  const onValueChange = () => {
    // TODO: need api handling
  }
  const options = useCodesetOptions(CODESETS.RecordStatus)

  const items = options.map((option) => (
    <Select.Item
      key={option.value}
      value={option.value}
      disabled={option.disabled}
    >
      {option.label}
    </Select.Item>
  ))

  return (
    <Select.Root size="1" onValueChange={onValueChange}>
      <Select.Trigger
        placeholder="Select"
        className="h-[var(--chip-height)] w-full max-w-[90px] overflow-y-auto"
      />
      <Select.Content position="popper" align="center" highContrast>
        {items}
      </Select.Content>
    </Select.Root>
  )
}

export { StatusSelect }
