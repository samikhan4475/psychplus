import { Text } from '@radix-ui/themes'
import { ClaimServiceLine } from './types'

interface TableCellLongTextProps {
  row: {
    original: ClaimServiceLine
    index: number
  }
  maxWidth: number
}

const ClaimTableCellLongText = ({ row, maxWidth }: TableCellLongTextProps) => {
  const { units, unitAmount } = row.original

  // Calculate the value and format to two decimal places
  const calculatedValue =
    units && unitAmount ? (units * unitAmount).toFixed(2) : '0.00'
  return (
    <Text
      size="1"
      className={`block overflow-hidden text-ellipsis whitespace-nowrap max-w-${maxWidth} w-[80px]`}
    >
      {calculatedValue}
    </Text>
  )
}

export { ClaimTableCellLongText }
