'use client'

import { Select } from '@radix-ui/themes'
import { useCodesetCodes } from '@/hooks'
import { cn } from '@/utils'

interface CodesetSelectCellProps {
  value?: string
  codeset: string
  exclude?: string[]
  onValueChange?: (value: string) => void
  className?: string
  disabled?: boolean
}

const CodesetSelectCell = ({
  value,
  onValueChange,
  codeset,
  exclude,
  className,
  disabled,
}: CodesetSelectCellProps) => {
  const codes = useCodesetCodes(codeset)

  const items = codes
    .filter((code) => !exclude?.includes(code.value))
    .map((code) => (
      <Select.Item key={code.value} value={code.value}>
        {code.display}
      </Select.Item>
    ))

  return (
    <Select.Root
      size="1"
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <Select.Trigger
        placeholder="Select"
        className={cn('h-5 w-full text-gray-12', className)}
      />
      <Select.Content position="popper" highContrast>
        {items}
      </Select.Content>
    </Select.Root>
  )
}

export { CodesetSelectCell }
