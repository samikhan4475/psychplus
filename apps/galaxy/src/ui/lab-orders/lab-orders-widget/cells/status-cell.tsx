import { Badge, BadgeProps } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { LabOrders } from '@/types'

interface StatusCellProps {
  row: Row<LabOrders>
}

const StatusCell = ({ row }: StatusCellProps) => {
  const orderStatus = row.original?.orderStatus ?? ''
  return (
    <Badge className="!rounded-none" color={getBadgeColor(orderStatus)}>
      {labOrderStatusValues[orderStatus]}
    </Badge>
  )
}

const labOrderStatusValues: Record<string, string> = {
  Unsigned: 'Unsigned',
  Signed: 'Signed',
  SignedNotSent: 'Signed and Not sent',
  SignedSent: 'Signed and Sent',
  ResultReceived: 'Result',
}

const badgeColorMap: Record<string, BadgeProps['color']> = {
  Unsigned: 'gray',
  ResultReceived: 'green',
  SignedNotSent: 'yellow',
  SignedSent: 'blue',
  Signed: 'gray',
}

const getBadgeColor = (status: string): BadgeProps['color'] =>
  badgeColorMap[status] || 'gray'

export { StatusCell }
