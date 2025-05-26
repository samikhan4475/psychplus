import { Row } from '@tanstack/react-table'
import { TextCell } from '@/components'
import { MedicationRefill } from '../types'

interface RefillCellProps {
  row: Row<MedicationRefill>
}

const RefillCell = ({ row }: RefillCellProps) => {
  const drug = row.original?.drugList?.[0]
  return <TextCell>{drug?.refills ?? ''}</TextCell>
}

export default RefillCell
