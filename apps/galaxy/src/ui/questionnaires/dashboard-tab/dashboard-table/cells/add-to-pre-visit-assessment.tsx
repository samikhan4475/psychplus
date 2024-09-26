'use client'

import { CheckboxCell } from '@/components'

interface AddToPreVisitAssessmentProps {
  checked: boolean
  className?: string
  onCheckedChange: (checked: boolean) => void
}

const AddToPreVisitAssessmentCell = ({
  checked,
  className,
  onCheckedChange,
}: AddToPreVisitAssessmentProps) => {
  return (
    <CheckboxCell
      label={checked ? 'Yes' : 'No'}
      checked={checked}
      className={className}
      onCheckedChange={onCheckedChange}
    />
  )
}

export { AddToPreVisitAssessmentCell }
