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
      className="h-full w-full"
      justify="center"
      align="center"
    >
      <Checkbox
        checked={checked}
        color="indigo"
        size="1"
        highContrast
        onCheckedChange={onCheckedChange}
        aria-label="Select all"
      />
    </Flex>
  )
}

export { TableHeaderCheckboxCell }
