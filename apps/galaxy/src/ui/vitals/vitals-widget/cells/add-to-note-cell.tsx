'use client'

import { useState } from 'react'
import { CheckboxCell } from '@/components'
import type { PatientVitalRow } from '../types'

interface AddToNoteCellProps {
  row: PatientVitalRow
}

const AddToNoteCell = ({ row }: AddToNoteCellProps) => {
  const [addToNote, setAddToNote] = useState(row.original.addToNote)

  return (
    <CheckboxCell
      label={addToNote ? 'Yes' : 'No'}
      checked={addToNote}
      onCheckedChange={(checked) => {
        setAddToNote(checked)
      }}
    />
  )
}

export { AddToNoteCell }
