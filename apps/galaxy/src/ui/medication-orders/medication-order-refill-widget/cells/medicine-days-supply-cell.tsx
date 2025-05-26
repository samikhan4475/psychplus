import { Row } from '@tanstack/react-table'
import { TextCell } from '@/components'
import { MedicationRefill } from '../types'

interface MedicineDaysSupplyCellProps {
  row: Row<MedicationRefill>
}

const MedicineDaysSupplyCell = ({ row }: MedicineDaysSupplyCellProps) => {
  const drug = row.original?.drugList?.[0]
  return <TextCell>{drug?.daysSupply}</TextCell>
}

export default MedicineDaysSupplyCell
