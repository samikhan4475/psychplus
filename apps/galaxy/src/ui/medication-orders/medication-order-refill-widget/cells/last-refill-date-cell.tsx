import { Row } from '@tanstack/react-table'
import { DateTimeCell } from '@/components'
import { formatDate } from '@/utils'
import { MedicationRefill } from '../types'

interface LastRefillDateCellProps {
  row: Row<MedicationRefill>
}

const LastRefillDateCell = ({ row }: LastRefillDateCellProps) => {
  const drug = row.original?.drugList?.[0]
  return (
    <DateTimeCell>
      {drug?.lastFillDate
        ? formatDate(`${drug?.lastFillDate}`, 'MM/dd/yyyy')
        : ''}
    </DateTimeCell>
  )
}

export default LastRefillDateCell
