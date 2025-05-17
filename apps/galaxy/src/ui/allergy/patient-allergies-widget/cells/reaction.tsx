import { TextCell } from '@/components'
import { CODESETS, FEATURE_FLAGS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { PatientAllergyRow } from '../types'

interface TypeCellProps {
  row: PatientAllergyRow
}

const Reaction = ({ row }: TypeCellProps) => {
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )
  const codes = useCodesetCodes(CODESETS.AllergyReaction)
  const value = isFeatureFlagEnabled
    ? row.original.reaction
    : codes.find(
        (code) => code.value.toString() === row.original.reactionId?.toString(),
      )?.display

  return <TextCell>{value}</TextCell>
}

export { Reaction }
