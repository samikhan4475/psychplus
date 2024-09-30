import { Text } from '@radix-ui/themes'
import { CellContext } from '@tanstack/react-table'
import { cn } from '@psychplus/ui/cn'
import { useStore } from '../../store'
import { InsurancePayment } from '../../types'

interface TableCellProps {
  row: CellContext<InsurancePayment, Date | undefined>['row']
  maxWidth?: number
}

const TableCellClaimIdText = ({ row, maxWidth }: TableCellProps) => {
  const { checkNumber } = row.original

  return (
    <Text
      size="1"
      className={cn('block overflow-hidden text-ellipsis whitespace-nowrap', {
        maxWidth: `${maxWidth}px`,
      })}
    >
      {checkNumber}
    </Text>
  )
}

export { TableCellClaimIdText }
