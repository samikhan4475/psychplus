import { Badge, BadgeProps } from '@radix-ui/themes'
import type { PatientAllergyRow } from '../types'

interface SeverityCellProps {
  row: PatientAllergyRow
}

const SeverityCell = ({ row }: SeverityCellProps) => {
  return (
    <Badge
      size="1"
      variant="soft"
      mx="1"
      color={getBadgeColor(row.original.severityCode)}
    >
      {row.original.severityCode}
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
