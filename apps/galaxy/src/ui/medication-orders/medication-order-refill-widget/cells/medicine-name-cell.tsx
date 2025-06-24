import { Row } from '@tanstack/react-table'
import { LongTextCell } from '@/components'
import { MedicationRefill } from '../types'

interface MedicineNameCellProps {
  row: Row<MedicationRefill>
}

const MedicineNameCell = ({ row }: MedicineNameCellProps) => {
  const drug = row.original?.drugList?.[0]
  return (
    <LongTextCell className='w-[300px]'>{drug?.drugDescription}</LongTextCell>
  )
}

export default MedicineNameCell
