import { Badge } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { PayerPlanAddress } from '@/types/payer'

interface StatusCellProps {
  row: Row<PayerPlanAddress>
}

const TableCellStatus = ({ row }: StatusCellProps) => {
  return (
    <Badge
      color={row.original.status ? 'green' : 'red'}
      size="1"
      className="rounded-1 font-regular"
    >
      {row.original.status ? 'Active' : 'Inactive'}
    </Badge>
  )
}

export { TableCellStatus }
