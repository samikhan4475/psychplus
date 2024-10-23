'use client'

import { TextField } from '@radix-ui/themes'

const TableCellTotalAmount = () => {
  return (
    <TextField.Root
      size="1"
      placeholder="0.00"
      className="[box-shadow:none]"
      disabled={true}
    />
  )
}

export { TableCellTotalAmount }
