import { Row } from '@tanstack/react-table'
import { TextCell } from '@/components'
import { getTextColorClass } from '../utils'

interface ResultNameCellProps {
  row: Row<any>
}

export const ResultNameCell = ({ row }: ResultNameCellProps) => {
  const abnormalCode = row.original?.abnormalRangeCode as string | undefined
  const textClass = getTextColorClass(abnormalCode)

  return (
    <TextCell>
      <span className={textClass}>{row.original?.resultName}</span>
    </TextCell>
  )
}
