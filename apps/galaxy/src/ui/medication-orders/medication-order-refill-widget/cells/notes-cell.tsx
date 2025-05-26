import { Row } from '@tanstack/react-table'
import { LongTextCell } from '@/components'
import { MedicationRefill } from '../types'

interface MedicineNameCellProps {
  row: Row<MedicationRefill>
}

const NotesNameCell = ({ row }: MedicineNameCellProps) => {
  const drug = row.original?.drugList?.[0]
  return <LongTextCell className="w-[150px]">{drug?.drugNote}</LongTextCell>
}

export default NotesNameCell
