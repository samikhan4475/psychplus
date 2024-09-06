'use client'

import { useState } from 'react'
import { CheckboxCell } from '@/components'
import type { QuestionnairesDashboardRow } from '../types'

interface AddToPreVisitAssessmentProps {
  row: QuestionnairesDashboardRow
}

const AddToPreVisitAssessmentCell = ({ row }: AddToPreVisitAssessmentProps) => {
  const [addToPreVisitAssessment, setAddToPreVisitAssessment] = useState(
    row.original.addToPreVisitAssessment,
  )

  return (
    <CheckboxCell
      label={addToPreVisitAssessment ? 'Yes' : 'No'}
      checked={addToPreVisitAssessment}
      onCheckedChange={(checked) => {
        setAddToPreVisitAssessment(checked)
      }}
    />
  )
}

export { AddToPreVisitAssessmentCell }
