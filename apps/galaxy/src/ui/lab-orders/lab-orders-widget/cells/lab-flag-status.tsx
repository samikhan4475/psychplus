import { Badge, BadgeProps, Tooltip } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { LabResult } from '@/types'
import { FlagStatus } from '../types'

interface FlagStatusCellProps {
  row: Row<LabResult>
}

const FlagStatusCell = ({ row }: FlagStatusCellProps) => {
  const codes = useCodesetCodes(CODESETS.AbnormalFlag)
  const flagStatus = codes?.find(
    (item) => item?.value === row.original?.abnormalRangeCode,
  )
  const { abnormalRangeCode } = row.original
  return (
    <Tooltip content={flagStatus?.display}>
      <Badge
        className="!rounded-none "
        color={getBadgeColor(abnormalRangeCode as FlagStatus)}
      >
        {flagStatus?.value}
      </Badge>
    </Tooltip>
  )
}

const badgeColorMap: Record<FlagStatus, BadgeProps['color']> = {
  [FlagStatus.High]: 'green',
  [FlagStatus.Low]: 'red',
  [FlagStatus.Normal]: 'green',
}

const getBadgeColor = (status: FlagStatus): BadgeProps['color'] =>
  badgeColorMap[status] || 'gray'

export { FlagStatusCell }
