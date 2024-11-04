'use client'

import { Checkbox, Flex } from '@radix-ui/themes'

interface RowCheckboxProps {
  checked: boolean
  onCheckedChange: (val: boolean) => void
}

const TableRowCheckboxCell = ({
  checked,
  onCheckedChange,
}: RowCheckboxProps) => {
  return (
    <Flex
      onClick={(e) => e.stopPropagation()}
      className="w-full"
      justify="center"
      align="center"
    >
      <Checkbox
        checked={checked}
        size="1"
        onCheckedChange={onCheckedChange}
        color="indigo"
        highContrast
      />
    </Flex>
  )
}

export { TableRowCheckboxCell }
