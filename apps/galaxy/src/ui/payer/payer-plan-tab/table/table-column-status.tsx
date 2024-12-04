import { Badge } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { PayerPlanResponse } from '@/types'

interface StatusCellProps {
  row: Row<PayerPlanResponse>
}

const TableCellStatus = ({ row }: StatusCellProps) => {
  return (
    <Badge
      color={row.original.isActive ? 'green' : 'red'}
      size="1"
      className="rounded-1 font-regular"
    >
      {row.original.isActive ? 'Active' : 'Inactive'}
    </Badge>
  )
}

export { TableCellStatus }
