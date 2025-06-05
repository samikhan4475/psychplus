import { Badge, BadgeProps, Text, Tooltip } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { LabOrders } from '@/types'
import { reviewStatusIcon } from './review-status-icon'

interface StatusCellProps {
  row: Row<LabOrders>
  appointmentId?: string
}

const StatusCell = ({ row, appointmentId }: StatusCellProps) => {
  const orderStatus = row.original?.orderStatus ?? ''
  const order = row.original
  return (
    <div className="flex items-center">
      <Badge className="!rounded-none" color={getBadgeColor(orderStatus)}>
        {labOrderStatusValues[orderStatus]}
      </Badge>
      {reviewStatusIcon(order, appointmentId)}
    </div>
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
