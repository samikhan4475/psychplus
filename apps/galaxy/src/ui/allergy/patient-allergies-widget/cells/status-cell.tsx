import { TextCell } from '@/components'
import { FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { PatientAllergyRow } from '../types'
import { getStatusLabel } from '../utils'

interface TypeCellProps {
  row: PatientAllergyRow
}

const Status = ({ row }: TypeCellProps) => {
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )
  const statusValue = isFeatureFlagEnabled
    ? getStatusLabel(row.original.archive)
    : row.original.recordStatus
  return <TextCell>{statusValue}</TextCell>
}

export { Status }
