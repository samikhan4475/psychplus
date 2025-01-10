import { Badge, BadgeProps } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { LabOrders } from '@/types'
import { LabOrderStatus } from '../types'

interface StatusCellProps {
  row: Row<LabOrders>
}

const StatusCell = ({ row }: StatusCellProps) => {
  const { orderStatus } = row.original
  return (
    <Badge className="!rounded-none" color={getBadgeColor(orderStatus)}>
      {orderStatus}
    </Badge>
  )
}

const badgeColorMap: Record<LabOrderStatus, BadgeProps['color']> = {
  Draft: 'gray',
  ResultReceived: 'green',
  OrderCompleted: 'blue',
  'Submission Pending': 'blue',
  PreOrder: 'yellow',
  Cancelled: 'red',
  Pending: 'yellow',
}

const getBadgeColor = (status: LabOrderStatus): BadgeProps['color'] =>
  badgeColorMap[status] || 'gray'

export { StatusCell }
