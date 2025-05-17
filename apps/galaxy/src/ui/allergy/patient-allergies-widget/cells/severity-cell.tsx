import { Badge, BadgeProps } from '@radix-ui/themes'
import { CODESETS, FEATURE_FLAGS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import type { PatientAllergyRow } from '../types'

interface SeverityCellProps {
  row: PatientAllergyRow
}

const SeverityCell = ({ row }: SeverityCellProps) => {
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )
  const codes = useCodesetCodes(CODESETS.AllergySeverity)
  const severity = isFeatureFlagEnabled
    ? row.original.severityCode
    : codes.find(
        (code) =>
          code.value.toString() === row.original.severityCode?.toString(),
      )?.display

  return (
    <Badge
      size="1"
      variant="soft"
      mx="1"
      color={getBadgeColor(severity ?? row.original.severityCode)}
    >
      {severity}
    </Badge>
  )
}

const getBadgeColor = (severity: string): BadgeProps['color'] => {
  switch (severity) {
    case 'Mild':
      return 'green'
    case 'Moderate':
      return 'orange'
    case 'Severe':
      return 'red'
    default:
      return 'gray'
  }
}

export { SeverityCell }
