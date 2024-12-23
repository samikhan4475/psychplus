'use client'

import { useState } from 'react'
import { CheckboxCell } from '@/components'

const AddToPreVisitAssessmentCell = () => {
  const [addToPrevisit, setAddToPrevisit] = useState(false)

  return (
    <CheckboxCell
      label="Add to Pre-Visit Assessment"
      checked={addToPrevisit}
      onCheckedChange={(checked) => {
        setAddToPrevisit(checked)
      }}
    />
  )
}

export { AddToPreVisitAssessmentCell }
