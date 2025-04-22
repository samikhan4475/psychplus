import { Row } from '@tanstack/react-table'
import { TextCell } from '@/components'
import { MedicationRefill, RefillMedicationType } from '../types'

interface MedicineQtyCellProps {
  row: Row<MedicationRefill>
}

const MedicineQtyCell = ({ row }: MedicineQtyCellProps) => {
  const quantityValue =
    row.original?.drugList?.find(
      (drug) => drug.medicationType === RefillMedicationType.MedicationType,
    )?.quantityValue ?? ''
  return <TextCell>{quantityValue}</TextCell>
}

export default MedicineQtyCell
