import { Badge, BadgeProps } from '@radix-ui/themes'
import type { AllergySeverity, PatientAllergyRow } from '../types'

interface SeverityCellProps {
  row: PatientAllergyRow
}

const SeverityCell = ({ row }: SeverityCellProps) => {
  return (
    <Badge size="1" variant="soft" mx="1" color={getBadgeColor(row.original.severity)}>
      {row.original.severity}
    </Badge>
  )
}

const getBadgeColor = (severity: AllergySeverity): BadgeProps['color'] => {
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
