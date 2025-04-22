import { Row } from '@tanstack/react-table'
import { DateTimeCell } from '@/components'
import { formatDate } from '@/utils'
import { MedicationRefill, RefillMedicationType } from '../types'

interface LastRefillDateCellProps {
  row: Row<MedicationRefill>
}

const LastRefillDateCell = ({ row }: LastRefillDateCellProps) => {
  const lastFillDate =
    row.original?.drugList?.find(
      (drug) => drug.medicationType === RefillMedicationType.MedicationType,
    )?.lastFillDate ?? undefined
  return (
    <DateTimeCell>
      {lastFillDate ? formatDate(`${lastFillDate}`, 'MM/dd/yyyy') : ''}
    </DateTimeCell>
  )
}

export default LastRefillDateCell
