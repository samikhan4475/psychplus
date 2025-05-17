import { Row } from '@tanstack/react-table'
import { DateTimeCell, TextCell } from '@/components'
import { formatDate } from '@/utils'
import { MedicationRefill, RefillMedicationType } from '../types'

interface RefillCellProps {
  row: Row<MedicationRefill>
}

const RefillCell = ({ row }: RefillCellProps) => {
  const refills =
    row.original?.drugList?.find(
      (drug) => drug.medicationType === RefillMedicationType.MedicationType,
    )?.refills ?? undefined
  return <TextCell>{refills ?? ''}</TextCell>
}

export default RefillCell
