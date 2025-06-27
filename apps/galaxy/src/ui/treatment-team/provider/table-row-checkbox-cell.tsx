'use client'

import { Flex, Radio } from '@radix-ui/themes'

interface RowCheckboxProps {
  checked: boolean
}

const TableRowCheckboxCell = ({ checked }: RowCheckboxProps) => {
  return (
    <Flex
      onClick={(e) => e.stopPropagation()}
      className="w-full pl-1 "
      justify="start"
      align="center"
    >
      <Radio
        value="true"
        checked={checked}
        className="cursor-not-allowed"
        highContrast
        size="1"
      />
    </Flex>
  )
}

export { TableRowCheckboxCell }
