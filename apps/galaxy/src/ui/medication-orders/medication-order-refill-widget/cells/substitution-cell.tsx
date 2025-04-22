import { Row } from '@tanstack/react-table'
import { TextCell } from '@/components'
import { MedicationRefill, RefillMedicationType } from '../types'

interface SubstitutionCellProps {
  row: Row<MedicationRefill>
}

const SubstitutionCell = ({ row }: SubstitutionCellProps) => {
  const isSubstitutionsAllowed =
    row.original?.drugList?.find(
      (drug) => drug.medicationType === RefillMedicationType.MedicationType,
    )?.isSubstitutionsAllowed ?? undefined
  return <TextCell>{isSubstitutionsAllowed ? 'Yes' : 'No'}</TextCell>
}

export default SubstitutionCell
