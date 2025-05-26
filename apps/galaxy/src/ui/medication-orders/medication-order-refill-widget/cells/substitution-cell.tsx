import { Row } from '@tanstack/react-table'
import { TextCell } from '@/components'
import { MedicationRefill, RefillMedicationType } from '../types'

interface SubstitutionCellProps {
  row: Row<MedicationRefill>
}

const SubstitutionCell = ({ row }: SubstitutionCellProps) => {
  const drug = row.original?.drugList?.[0]
  return <TextCell>{!drug?.isSubstitutionsAllowed ? 'Yes' : 'No'}</TextCell>
}

export default SubstitutionCell
