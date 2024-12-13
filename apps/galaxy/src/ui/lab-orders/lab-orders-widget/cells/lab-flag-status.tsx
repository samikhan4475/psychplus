import { Badge, BadgeProps } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { LabResult } from '@/types'

interface FlagStatusCellProps {
  row: Row<LabResult>
}

const FlagStatusCell = ({ row }: FlagStatusCellProps) => {
  const { abnormalRangeCode } = row.original
  return (
    <Badge className="!rounded-none" color={getBadgeColor(abnormalRangeCode)}>
      {abnormalRangeCode}
    </Badge>
  )
}

const badgeColorMap: Record<string, BadgeProps['color']> = {
  High: 'green',
  Low: 'red',
  Normal: 'yellow',
}

const getBadgeColor = (status: string): BadgeProps['color'] =>
  badgeColorMap[status] || 'gray'

export { FlagStatusCell }
