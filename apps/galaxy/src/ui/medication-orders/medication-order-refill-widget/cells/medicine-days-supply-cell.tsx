import { Row } from '@tanstack/react-table'
import { TextCell } from '@/components'
import { MedicationRefill, RefillMedicationType } from '../types'

interface MedicineDaysSupplyCellProps {
  row: Row<MedicationRefill>
}

const MedicineDaysSupplyCell = ({ row }: MedicineDaysSupplyCellProps) => {
  const daysSupply =
    row.original?.drugList?.find(
      (drug) => drug.medicationType === RefillMedicationType.MedicationType,
    )?.daysSupply ?? ''
  return <TextCell>{daysSupply}</TextCell>
}

export default MedicineDaysSupplyCell
