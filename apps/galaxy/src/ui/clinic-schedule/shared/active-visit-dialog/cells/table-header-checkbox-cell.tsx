'use client'

import { Checkbox, Flex } from '@radix-ui/themes'

interface HeaderCheckboxProps {
  checked: boolean
  onCheckedChange: (value: boolean) => void
}

const TableHeaderCheckboxCell = ({
  checked,
  onCheckedChange,
}: HeaderCheckboxProps) => {
  return (
    <Flex
      onClick={(e) => e.stopPropagation()}
      className="w-full"
      justify="center"
      align="center"
      pt="1"
    >
      <Checkbox
        checked={checked}
        highContrast
        size="1"
        onCheckedChange={(value) => {
          onCheckedChange(!!value)
        }}
      />
    </Flex>
  )
}

export { TableHeaderCheckboxCell }
