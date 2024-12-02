import { Badge, BadgeProps } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { LabResult } from '@/types'
import { ResultOrderStatus } from '../types'

interface StatusCellProps {
  row: Row<LabResult>
}

const ResultStatusCell = ({ row }: StatusCellProps) => {
  const { recordStatus } = row.original
  return (
    <Badge className="!rounded-none" color={getBadgeColor(recordStatus)}>
      {recordStatus}
    </Badge>
  )
}

const badgeColorMap: Record<ResultOrderStatus, BadgeProps['color']> = {
  Final: 'green',
  Partial: 'yellow',
}

const getBadgeColor = (status: ResultOrderStatus): BadgeProps['color'] =>
  badgeColorMap[status] || 'gray'

export { ResultStatusCell }
