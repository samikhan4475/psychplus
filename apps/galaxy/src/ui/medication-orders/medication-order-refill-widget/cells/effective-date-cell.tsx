import { Row } from '@tanstack/react-table'
import { DateTimeCell } from '@/components'
import { formatDate } from '@/utils'
import { MedicationRefill } from '../types'

interface EffectiveDateCellProps {
  row: Row<MedicationRefill>
}

const EffectiveDateCell = ({ row }: EffectiveDateCellProps) => {
  const drug = row.original?.drugList?.[0]
  return (
    <DateTimeCell>
      {drug?.effectiveDate
        ? formatDate(`${drug?.effectiveDate}`, 'MM/dd/yyyy')
        : ''}
    </DateTimeCell>
  )
}

export default EffectiveDateCell
