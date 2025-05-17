import { TextCell } from '@/components'
import { CODESETS, FEATURE_FLAGS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { PatientAllergyRow } from '../types'

interface TypeCellProps {
  row: PatientAllergyRow
}

const AllergyType = ({ row }: TypeCellProps) => {
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )
  const codes = useCodesetCodes(CODESETS.AllergyType)
  const allergyType = isFeatureFlagEnabled
    ? row.original.allergyType
    : codes.find(
        (code) =>
          code.value.toString() === row.original.allergyType?.toString(),
      )?.display

  return <TextCell>{allergyType}</TextCell>
}

export { AllergyType }
