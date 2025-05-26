import { Row } from '@tanstack/react-table'
import { TextCell } from '@/components'
import { MedicationRefill } from '../types'

interface MedicineQtyCellProps {
  row: Row<MedicationRefill>
}

const MedicineQtyCell = ({ row }: MedicineQtyCellProps) => {
  const drug = row.original?.drugList?.[0]
  return <TextCell>{drug?.quantityValue}</TextCell>
}

export default MedicineQtyCell
