'use client'

import { TextField } from '@radix-ui/themes'
import { ClaimServiceLine } from '@/types'

interface TableCellLongTextProps {
  row: {
    original: ClaimServiceLine
    index: number
  }
}

const TableCellTotalAmount = ({ row }: TableCellLongTextProps) => {
  const { units, unitAmount } = row.original

  const calculatedTotalAmount =
    units && unitAmount ? (units * unitAmount).toFixed(2) : '0.00'

  return (
    <TextField.Root
      size="1"
      placeholder="0.00"
      className="[box-shadow:none]"
      disabled={true}
      value={calculatedTotalAmount}
    />
  )
}

export { TableCellTotalAmount }
