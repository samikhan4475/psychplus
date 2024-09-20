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
      className="w-full px-0.5"
      justify="center"
      align="center"
    >
      <Checkbox
        checked={checked}
        className="mt-0.5"
        size="1"
        onCheckedChange={onCheckedChange}
        color="indigo"
        highContrast
      />
    </Flex>
  )
}

export { TableRowCheckboxCell }
