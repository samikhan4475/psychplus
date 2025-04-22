import { Row } from '@tanstack/react-table'
import { DateTimeCell } from '@/components'
import { formatDate } from '@/utils'
import { MedicationRefill, RefillMedicationType } from '../types'

interface EffectiveDateCellProps {
  row: Row<MedicationRefill>
}

const EffectiveDateCell = ({ row }: EffectiveDateCellProps) => {
  const startDateTime =
    row.original?.drugList?.find(
      (drug) => drug.medicationType === RefillMedicationType.MedicationType,
    )?.startDateTime ?? undefined
  return (
    <DateTimeCell>
      {startDateTime ? formatDate(`${startDateTime}`, 'MM/dd/yyyy') : ''}
    </DateTimeCell>
  )
}

export default EffectiveDateCell
