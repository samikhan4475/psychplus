import { Badge, BadgeProps, Tooltip } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { LabResult } from '@/types'
import { ResultStatusCode } from '../types'

interface StatusCellProps {
  row: Row<LabResult>
}

const ResultStatusCell = ({ row }: StatusCellProps) => {
  const { statusCode } = row.original
  const codes = useCodesetCodes(CODESETS.StatusCodes)
  const resultStatus = codes?.find((item) => item?.value === statusCode)
  return (
    <Tooltip content={resultStatus?.display}>
      <Badge
        className="!rounded-none"
        color={getBadgeColor(statusCode as ResultStatusCode)}
      >
        {resultStatus?.value}
      </Badge>
    </Tooltip>
  )
}

const badgeColorMap: Record<ResultStatusCode, BadgeProps['color']> = {
  [ResultStatusCode.Final]: 'blue',
  [ResultStatusCode.Partial]: 'orange',
}

const getBadgeColor = (status: ResultStatusCode): BadgeProps['color'] =>
  badgeColorMap[status] || 'gray'

export { ResultStatusCell }
