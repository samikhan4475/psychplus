'use client'

import { useState } from 'react'
import { CheckboxCell } from '@/components'

const AddToPreVisitAssessmentCell = () => {
  const [addToNote, setAddToNote] = useState(false)

  return (
    <CheckboxCell
      label="Add to Pre-Visit Assessment"
      checked={addToNote}
      onCheckedChange={(checked) => {
        setAddToNote(checked)
      }}
    />
  )
}

export { AddToPreVisitAssessmentCell }
