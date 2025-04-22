import { Row } from '@tanstack/react-table'
import { LongTextCell } from '@/components'
import { MedicationRefill, RefillMedicationType } from '../types'

interface MedicineNameCellProps {
  row: Row<MedicationRefill>
}

const MedicineNameCell = ({ row }: MedicineNameCellProps) => {
  const drugDescription =
    row.original?.drugList?.find(
      (drug) => drug.medicationType === RefillMedicationType.MedicationType,
    )?.drugDescription ?? ''
  return <LongTextCell className="w-[150px]">{drugDescription}</LongTextCell>
}

export default MedicineNameCell
